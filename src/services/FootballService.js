import useHttp from "../hooks/http.hooks";
import { sliceTopscorers, extractData } from "./functions";

const useFootballService = () => {
    const { getDataFromApi, cleanError, process, setProcess } = useHttp();

    const getAllCountry = getDataFromApi("countries");
    const getCountry = getDataFromApi("countries/");
    const getVenue = getDataFromApi("venues/");
    const getTeam = getDataFromApi("teams/");
    const getFixtures = getDataFromApi("fixtures/");
    const getHeadToHead = getDataFromApi("head2head/");
    const getRankings = getDataFromApi("standings/season/");
    const getAllVenues = getDataFromApi("venues/season/");
    const getallTeams = getDataFromApi("teams/season/");
    const getTopScorers = getDataFromApi("topscorers/season/");
    const getPlayer = getDataFromApi("players/");

    const findPlayer = async (id) => await getPlayer(id);

    const findFewPlayersById = async (topScorers, teamId) => {
        const allPlayers = [];
        const slicedTopcorers = sliceTopscorers(topScorers, teamId);
        const ids = slicedTopcorers.flat().map((el) => el.player_id);

        const length = ids.length;
        for (let i = 0; i < length; i++) {
            allPlayers.push(await findPlayer(ids[i]));
        }
        return { slicedTopcorers, allPlayers };
    };

    const findTopscoreres = async (id) => {
        const topScorers = await getTopScorers(`${id}/aggregated`);
        const {
            aggregatedGoalscorers,
            aggregatedAssistscorers,
            aggregatedCardscorers,
        } = topScorers;
        return [
            aggregatedGoalscorers,
            aggregatedAssistscorers,
            aggregatedCardscorers,
        ].map((el) => extractData(el));
    };

    const findStadion = async (venue_id) => {
        if (!venue_id) {
            return {
                name: "___",
                city: "___",
                capacity: "___",
                address: "___",
            };
        }
        return await getVenue(venue_id);
    };

    const findOneTeam = async (team_id) => {
        const team = await getTeam(team_id);
        return transformTeam(team);
    };

    const transformGame = ({
        formations,
        scores,
        weather_report,
        time,
        standings,
        ...args
    }) => ({
        localteam_formation: formations?.localteam_formation,
        visitorteam_formation: formations?.visitorteam_formation,
        localteam_score: scores?.localteam_score,
        visitorteam_score: scores?.visitorteam_score,
        ht_score: scores?.ht_score ?? "--",
        ft_score: scores?.ft_score ?? "_ - _",
        date: time?.starting_at.date,
        temp: `${weather_report?.temperature_celcius?.temp ?? "-"} °C`,
        time: `${time?.minute ?? "00"}.00`,
        localteam_position: standings?.localteam_position,
        visitorteam_position: standings?.visitorteam_position,
        ...args,
    });

    const transformTeam = ({ name, ...args }) => ({ teamName: name, ...args });

    const findSeason = async (countryId) => {
        const league = await getCountry(`${countryId}/leagues`);
        return league[0]?.current_season_id;
    };

    const findStandings = async (current_season_id) => {
        const season = await getRankings(current_season_id);
        return season[0]?.standings?.data;
    };

    // const getGamesList = async (teamId) => {
    //     const team = await getOneTeam(teamId);
    //     const allTeams = await getAllTeams(team.country_id);

    //     return { team, allTeams };
    // };

    const findFlag = async (countryId) => {
        const country = await getCountry(countryId);
        return country?.image_path;
    };

    const findCountryTeams = async (selectedCountry) => {
        const teams = await getCountry(`${selectedCountry}/teams`);
        return teams?.map(transformTeam);
    };

    const findRandomTeam = async (selectedCountry) => {
        const teams = await findCountryTeams(selectedCountry);
        const team = teams[Math.round(Math.random() * teams.length - 1)];
        const stadion = await findStadion(team.venue_id);

        return { team, stadion };
    };

    const findTeamInfoById = async (team_id) => {
        const team = await findOneTeam(team_id);
        const stadion = await findStadion(team.venue_id);

        return { team, stadion };
    };

    const findTeamInfoByName = async (name) => await getTeam(`search/${name}`);

    const findAllGamesByDate = async (period, teamId) => {
        const games = await getFixtures(`between/${period}/${teamId}`);

        return games.reverse().map(transformGame);
    };

    const findHead2Head = async (gameId) => {
        const game = await findFixture(gameId);
        const { localteam_id, visitorteam_id } = game;
        const local = await findOneTeam(localteam_id);
        const visitor = await findOneTeam(visitorteam_id);
        const lastGames = await getHeadToHead(
            `${localteam_id}/${visitorteam_id}`
        );
        const array = lastGames.slice(0, 10).map(transformGame);
        return {
            array,
            localId: localteam_id,
            l_name: local.teamName,
            visitId: visitorteam_id,
            v_name: visitor.teamName,
        };
    };

    const findFixture = async (gameId) => {
        const fixture = await getFixtures(gameId);
        return transformGame(fixture);
    };
    const findGameInfo = async ([selectedGame, gameId]) => {
        const id = selectedGame ? selectedGame : gameId;
        const game = await findFixture(id);

        const { localteam_id, visitorteam_id, venue_id } = game;

        const local = await findOneTeam(localteam_id);
        const visitor = await findOneTeam(visitorteam_id);
        const stadion = await findStadion(venue_id);

        return { game, local, visitor, stadion };
    };

    const findSeasonTeams = async (season_id) => {
        const teams = await getallTeams(season_id);
        return !teams ? null : teams.map(transformTeam);
    };

    //____________________________________________________________________________________
    //____________________________________________________________________________________

    const appInfo = async (countryName) => {
        if (!countryName) return;
        const allCountries = await getAllCountry("");
        const { id, image_path } = allCountries.find(
            ({ name }) => name === countryName
        );
        const season_id = await findSeason(id);
        const seasonTeams = await findSeasonTeams(season_id);
        const topScorers = await findTopscoreres(season_id);

        return { teams: seasonTeams, season_id, topScorers, image_path };
    };

    const mainPageInfo = async ({ season_id, topScorers }) => {
        const venues = await getAllVenues(season_id);
        const standings = await findStandings(season_id);
        const { slicedTopcorers, allPlayers } = await findFewPlayersById(
            topScorers
        );
        console.log(allPlayers);

        return { venues, standings, allPlayers, slicedTopcorers };
    };

    const teamPageInfo = async ({ period, teamId, topScorers }) => {
        const games = await findAllGamesByDate(period, teamId);
        const mainTeam = await findOneTeam(teamId);
        const allTeams = await findCountryTeams(mainTeam.country_id);
        const { slicedTopcorers, allPlayers } = await findFewPlayersById(
            topScorers,
            teamId
        );
        console.log(slicedTopcorers);
        return { mainTeam, allTeams, games, allPlayers, slicedTopcorers };
        // return;
    };

    const gamePageInfo = async () => {};

    // const getSingleGame = async (gameId) => {
    //     const fixture = await getFixtures(gameId);
    //     const game = transformGame(fixture);

    //     const { localteam_id, visitorteam_id, venue_id } = game;

    //     const local = await getOneTeam(localteam_id);
    //     const visitor = await getOneTeam(visitorteam_id);
    //     const stadion = await getStadion(venue_id);
    //     const lastGames = await getHeadToHead(
    //         `${localteam_id}/${visitorteam_id}`
    //     );
    //     const head2head = lastGames.slice(0, 10).map(transformGame);

    //     return { game, local, visitor, stadion, head2head };
    // };

    return {
        cleanError,
        process,
        setProcess,
        appInfo,
        mainPageInfo,
        teamPageInfo,
    };
};

export default useFootballService;

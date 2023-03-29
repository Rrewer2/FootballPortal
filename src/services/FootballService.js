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
    const getCommentaries = getDataFromApi("commentaries/fixture/");

    const findComments = async (id) => await getCommentaries(id);

    const findPlayer = async (id) => await getPlayer(id);

    const findFewPlayersById = async (topScorers, teamId, count) => {
        const slicedTopscorers = sliceTopscorers(topScorers, teamId, count);
        const ids = slicedTopscorers
            .flat()
            .map(({ player_id }) => findPlayer(player_id));
        const allPlayers = (await Promise.allSettled(ids)).map(
            ({ value }) => value
        );
        return { slicedTopscorers, allPlayers };
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

    // const findFlag = async (countryId) => {
    //     const country = await getCountry(countryId);
    //     return country?.image_path;
    // };
    // const findRandomTeam = async (selectedCountry) => {
    //     const teams = await findCountryTeams(selectedCountry);
    //     const team = teams[Math.round(Math.random() * teams.length - 1)];
    //     const stadion = await findStadion(team.venue_id);

    //     return { team, stadion };
    // };

    const findCountryTeams = async (selectedCountry) => {
        const teams = await getCountry(`${selectedCountry}/teams`);
        return teams?.map(transformTeam);
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

        return {
            season_id,
            image_path,
            topScorers: await findTopscoreres(season_id),
            teams: await findSeasonTeams(season_id),
        };
    };

    const mainPageInfo = async ({ season_id, topScorers }) => ({
        ...(await findFewPlayersById(topScorers)),
        venues: await getAllVenues(season_id),
        standings: await findStandings(season_id),
    });

    const teamPageInfo = async ({ period, teamId, topScorers }) => {
        const games = findAllGamesByDate(period, teamId);
        const mainTeam = await findOneTeam(teamId);
        const allTeams = findCountryTeams(mainTeam.country_id);
        return {
            mainTeam,
            ...(await findFewPlayersById(topScorers, teamId)),
            allTeams: await allTeams,
            games: await games,
        };
    };

    const gamePageInfo = async (gameId) => {
        // let d = new Date().getTime();
        // console.log("1game", d);
        const game = await findFixture(gameId);
        // console.log("2game", new Date().getTime() - d);
        const head2Head = findHead2Head(gameId);
        // console.log("3game", new Date().getTime() - d);
        const { localteam_id, visitorteam_id } = game;
        // console.log("4game", new Date().getTime() - d);
        const local = findOneTeam(localteam_id);
        // console.log("5game", new Date().getTime() - d);
        const visitor = findOneTeam(visitorteam_id);
        // console.log("6game", new Date().getTime() - d);
        const comments = findComments(gameId);
        // console.log("7game", new Date().getTime() - d);

        return {
            game,
            head2Head: await head2Head,
            local: await local,
            visitor: await visitor,
            comments: await comments,
        };
    };

    const topPlayersPageInfo = async (topScorers) => {
        const { slicedTopscorers, allPlayers } = await findFewPlayersById(
            topScorers,
            null,
            5
        );

        return { allPlayers, slicedTopscorers };
    };

    return {
        cleanError,
        process,
        setProcess,
        appInfo,
        mainPageInfo,
        teamPageInfo,
        gamePageInfo,
        topPlayersPageInfo,
    };
};

export default useFootballService;

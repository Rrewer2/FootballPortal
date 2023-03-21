import useHttp from "../hooks/http.hooks";

const useFootballService = () => {
    const { getDataFromApi, cleanError, process, setProcess } = useHttp();

    const getCountry = getDataFromApi("countries/");
    const getVenue = getDataFromApi("venues/");
    const getSeason = getDataFromApi("standings/season/");
    const getTeam = getDataFromApi("teams/");
    const getFixtures = getDataFromApi("fixtures/");
    const getHead2Head = getDataFromApi("head2head/");

    const getStadion = async (venue_id) => {
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

    const getOneTeam = async (team_id) => {
        const team = await getTeam(team_id);
        return transformTeam(team);
    };
    const plusZero = (num) => `${num > 9 ? "" : 0}${num}`;

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

    const getStandings = async (countryId) => {
        const league = await getCountry(`${countryId}/leagues`);
        const current_season_id = league[0]?.current_season_id;
        const season = await getSeason(current_season_id);

        return season[0]?.standings?.data;
    };

    const getGamesList = async (teamId) => {
        const team = await getOneTeam(teamId);
        const allTeams = await getAllTeams(team.country_id);

        return { team, allTeams };
    };

    const getFlag = async (countryId) => {
        const country = await getCountry(countryId);
        return country?.image_path;
    };

    const getAllTeams = async (selectedCountry) => {
        const teams = await getCountry(`${selectedCountry}/teams`);
        return teams?.map(transformTeam);
    };

    const getRandomTeam = async (selectedCountry) => {
        const teams = await getAllTeams(selectedCountry);
        const team = teams[Math.round(Math.random() * teams.length - 1)];
        const stadion = await getStadion(team.venue_id);

        return { team, stadion };
    };

    const getTeamInfoById = async (team_id) => {
        const team = await getOneTeam(team_id);
        const stadion = await getStadion(team.venue_id);

        return { team, stadion };
    };

    const getTeamInfoByName = async (name) => await getTeam(`search/${name}`);

    const getAllGamesByDate = async (month, teamId) => {
        const newDate = (a) => [a.getFullYear(), a.getMonth(), a.getDate()];

        const [YYYY, MM, DD] = newDate(new Date());
        let [nextYear, nextMonth, nextDay] = newDate(
            new Date(YYYY, MM + 1 - month, DD)
        );
        let [prevYear, prevMonth, prevDay] = newDate(
            new Date(YYYY, MM - month, DD + 1)
        );

        nextMonth = plusZero(nextMonth + 1);
        prevMonth = plusZero(prevMonth + 1);
        nextDay = plusZero(nextDay);
        prevDay = plusZero(prevDay);

        const period = `${prevYear}-${prevMonth}-${prevDay}/${nextYear}-${nextMonth}-${nextDay}`;
        const games = await getFixtures(`between/${period}/${teamId}`);

        return { newGames: games?.reverse().map(transformGame), period };
    };

    const getSingleGame = async (gameId) => {
        const fixture = await getFixtures(gameId);
        const game = transformGame(fixture);

        const { localteam_id, visitorteam_id, venue_id } = game;

        const local = await getOneTeam(localteam_id);
        const visitor = await getOneTeam(visitorteam_id);
        const stadion = await getStadion(venue_id);
        const lastGames = await getHead2Head(
            `${localteam_id}/${visitorteam_id}`
        );
        const head2head = lastGames.slice(0, 10).map(transformGame);

        return { game, local, visitor, stadion, head2head };
    };

    return {
        cleanError,
        process,
        setProcess,
        getAllTeams,
        getRandomTeam,
        getTeamInfoById,
        getTeamInfoByName,
        getAllGamesByDate,
        getFlag,
        getStandings,
        getSingleGame,
        getGamesList,
    };
};

export default useFootballService;

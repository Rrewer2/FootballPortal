import useHttp from "./useHttp";
import {
    sliceTopScorers,
    extractData,
    transformTeam,
    transformGame,
    allPromises,
} from "../services/index";
const date = Date.now();

export default function useEndpoints() {
    const {
        getCountry,
        getTeam,
        getFixtures,
        getHeadToHead,
        getRankings,
        getallTeams,
        getTopScorers,
        getPlayer,
        getCommentaries,
        getAllCountry,
        getAllVenues,
        status,
    } = useHttp();

    const findFixture = async (gameId) => {
        const fixture = await getFixtures(gameId);
        return transformGame(fixture);
    };

    const findOneTeam = async (team_id) => {
        const team = await getTeam(team_id);
        return transformTeam(team);
    };

    const findCountryTeams = async (selectedCountry) => {
        const teams = await getCountry(`${selectedCountry}/teams`);
        return teams?.map(transformTeam);
    };

    const findPlayer = async (id) => await getPlayer(id);

    return {
        findComments: async (id) => await getCommentaries(id),
        findFewPlayersById: async (topScorers, teamId, count) => {
            const slicedTopscorers = sliceTopScorers(topScorers, teamId, count);
            const ids = slicedTopscorers
                .flat()
                .map(({ player_id }) => findPlayer(player_id));
            const allPlayers = await allPromises(ids);
            return { slicedTopscorers, allPlayers };
        },
        findTopscoreres: async (id) => {
            const topScorers = await getTopScorers(`${id}/aggregated`);

            return [
                topScorers.aggregatedGoalscorers,
                topScorers.aggregatedAssistscorers,
                topScorers.aggregatedCardscorers,
            ].map(extractData);
        },
        findSeason: async (countryId) => {
            const league = await getCountry(`${countryId}/leagues`);
            return league[0]?.current_season_id;
        },
        findStandings: async (current_season_id) => {
            const season = await getRankings(current_season_id);
            return season[0]?.standings?.data;
        },
        findAllGamesByDate: async (period, teamId) => {
            const games = await getFixtures(`between/${period}/${teamId}`);

            return games.reverse().map(transformGame);
        },
        findHead2Head: async (gameId) => {
            console.log("30", Date.now() - date);
            const game = await findFixture(gameId);
            console.log("31", Date.now() - date);
            const { localteam_id, visitorteam_id } = game;
            const [local, visitor, lastGames] = await allPromises([
                findOneTeam(localteam_id),
                findOneTeam(visitorteam_id),
                getHeadToHead(`${localteam_id}/${visitorteam_id}`),
            ]);
            console.log("32", Date.now() - date);
            const head2Head = lastGames.slice(0, 10).map(transformGame);

            return { game, head2Head, local, visitor };
        },
        findSeasonTeams: async (season_id) => {
            const teams = await getallTeams(season_id);
            return teams?.map(transformTeam);
        },
        findTeamAndAllTeams: async (teamId) => {
            const mainTeam = await findOneTeam(teamId);
            const allTeams = await findCountryTeams(mainTeam.country_id);
            return { mainTeam, allTeams };
        },
        findCountryTeams,
        findOneTeam,
        findFixture,
        getAllCountry,
        getAllVenues,
        status,
    };
}

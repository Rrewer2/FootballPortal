import useEndpoints from "./useEndpoints";
import { allPromises } from "../services/index";

const date = Date.now();
console.log("0", date);
const obj = {};
export default function useFootballService() {
    const {
        findComments,
        findFewPlayersById,
        findTopscoreres,
        findSeason,
        findStandings,
        findAllGamesByDate,
        findHead2Head,
        findSeasonTeams,
        getAllCountry,
        getAllVenues,
        findTeamAndAllTeams,
        status,
    } = useEndpoints();

    return {
        status,
        appInfo: async (countryName) => {
            console.log("1", Date.now() - date);
            const allCountries = obj.countries ?? (await getAllCountry(""));
            console.log("2", Date.now() - date);
            if (obj.countries) obj.countries = allCountries;
            if (!countryName || !allCountries) return;
            const { id, image_path } = allCountries.find(
                ({ name }) => name === countryName
            );
            const season_id = await findSeason(id);
            console.log("3", Date.now() - date);

            const [topScorers, teams] = await allPromises([
                findTopscoreres(season_id),
                findSeasonTeams(season_id),
            ]);
            console.log("4", Date.now() - date);
            return {
                season_id,
                image_path,
                topScorers,
                teams,
            };
        },
        mainPageInfo: async (season_id, { topScorers }) => {
            console.log("5", Date.now() - date);
            const [scorers, venues, standings] = await allPromises([
                findFewPlayersById(topScorers),
                getAllVenues(season_id),
                findStandings(season_id),
            ]);
            console.log("6", Date.now() - date);
            return { ...scorers, venues, standings };
        },
        teamPageInfo: async ({ period, teamId, topScorers }) => {
            console.log("10", Date.now() - date);
            const [{ mainTeam, allTeams }, games, players] = await allPromises([
                findTeamAndAllTeams(teamId),
                findAllGamesByDate(period, teamId),
                findFewPlayersById(topScorers, teamId),
            ]);
            console.log("11", Date.now() - date);
            return { mainTeam, ...players, allTeams, games };
        },
        gamePageInfo: async (gameId) => {
            console.log("20", Date.now() - date);
            const [head2Head, comments] = await allPromises([
                findHead2Head(gameId),
                findComments(gameId),
            ]);
            console.log("21", Date.now() - date);
            return { ...head2Head, comments };
        },
        topPlayersPageInfo: async (topScorers) => {
            return await findFewPlayersById(topScorers, null, 5);
        },
    };
}

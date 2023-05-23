import narrowObj from "./narrowObj";
import findElemById from "./findElemById";

export default function getTopScorers(slicedScorers, teams, allPlayers) {
    return slicedScorers.map((el) =>
        el.map(({ player_id, team_id, ...args }) => ({
            ...args,
            ...narrowObj(
                findElemById(allPlayers, player_id),
                "display_name",
                "image_path"
            ),
            teamName: findElemById(teams, team_id).teamName,
            player_id,
        }))
    );
}

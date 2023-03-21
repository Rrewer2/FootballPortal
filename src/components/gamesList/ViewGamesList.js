import { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ViewGamesList = (games, teams) => {
    const itemRefs = useRef([]);
    const focusOnItem = (id) => {
        itemRefs.current[id].focus();
    };

    if (!games || !teams) return;
    const mainTeamName = teams.team.teamName;
    const items = games.map(
        (
            {
                id,
                localteam_id,
                visitorteam_id,
                winner_team_id: win_id,
                ht_score,
                ft_score,
                date,
                temp,
            },
            i
        ) => {
            const setTeamById = (team_id) => {
                const team = teams.allTeams.find(({ id }) => id === team_id);
                if (!team) {
                    console.log(`Team ${team_id} isn't finded`);
                    return teams.allTeams[teams.allTeams.length - 1];
                }
                return team;
            };
            const {
                id: l_id,
                teamName: l_name,
                logo_path: l_logo,
            } = setTeamById(localteam_id);
            const {
                id: v_id,
                teamName: v_name,
                logo_path: v_logo,
            } = setTeamById(visitorteam_id);

            const localStyle = l_id === win_id ? { color: "red" } : null;
            const visitorStyle = v_id === win_id ? { color: "red" } : null;

            return (
                <li
                    className="games__item"
                    key={id}
                    tabIndex={0}
                    ref={(el) => (itemRefs.current[i] = el)}
                    onClick={() => {
                        focusOnItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            focusOnItem(i);
                        }
                    }}
                >
                    <Link to={`/games/${id}`}>
                        <div>
                            <img src={l_logo} alt={l_name} />
                            <img src={v_logo} alt={v_name} />
                        </div>
                        <div className="games__item-name">
                            <span style={localStyle}>{l_name} </span>
                            <span>{ft_score} </span>({ht_score})
                            <span style={visitorStyle}> {v_name}</span>
                        </div>

                        <div className="games__item-price">
                            {date}, {temp}
                        </div>
                    </Link>
                </li>
            );
        }
    );

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`Page with gamelist of ${mainTeamName}`}
                />
                <title>{mainTeamName} games page</title>
            </Helmet>
            <div className="games__name">{mainTeamName} vs all</div>
            <ul className="games__grid">{items}</ul>
        </>
    );
};
export default ViewGamesList;

import { Link } from "react-router-dom";
import { findElemById, getClassName } from "../../services/index";
import "./gamesList.scss";

const ViewGamesList = ({ season, allTeams }) =>
    season.map(
        ({
            id,
            localteam_id,
            visitorteam_id,
            winner_team_id: win_id,
            ht_score,
            ft_score,
            date,
            temp,
        }) => {
            const {
                id: l_id,
                teamName: l_name,
                logo_path: l_logo,
            } = findElemById(allTeams, localteam_id);
            const {
                id: v_id,
                teamName: v_name,
                logo_path: v_logo,
            } = findElemById(allTeams, visitorteam_id);

            const l_class = getClassName(l_id, win_id, "games__item");
            const v_class = getClassName(v_id, win_id, "games__item");

            return (
                <li className="games__item" key={id} tabIndex={0}>
                    <Link to={`/games/${id}`}>
                        <div>
                            <img
                                src={l_logo}
                                alt={l_name}
                                className="games__item-img"
                            />
                            <img
                                src={v_logo}
                                alt={v_name}
                                className="games__item-img"
                            />
                        </div>
                        <h3 className="games__item-name">
                            <span className={l_class}>{l_name} </span>
                            <span>{ft_score} </span>({ht_score})
                            <span className={v_class}> {v_name}</span>
                        </h3>

                        <h4 className="games__item-price">
                            {date}, {temp}
                        </h4>
                    </Link>
                </li>
            );
        }
    );

export default ViewGamesList;

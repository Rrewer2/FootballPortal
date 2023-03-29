import { Link } from "react-router-dom";
import { getClassName } from "../../services/functions";
import "./head2Head.scss";

const ViewHead2Head = ({ array, localId, l_name, visitId, v_name }) =>
    array.map(
        ({
            id,
            localteam_id,
            visitorteam_id,
            winner_team_id,
            ht_score,
            ft_score,
            date,
        }) => {
            const localName = localId === localteam_id ? l_name : v_name;
            const visitorName = visitId === visitorteam_id ? v_name : l_name;

            const l_Class = getClassName(
                localteam_id,
                winner_team_id,
                "head2head__game"
            );

            const v_Class = getClassName(
                visitorteam_id,
                winner_team_id,
                "head2head__game"
            );

            return (
                <tr className="head2head__game" key={id}>
                    <td className={l_Class}>
                        <Link to={`/teams/${localteam_id}`}>{localName}</Link>
                    </td>
                    <td className="head2head__game-full">
                        <Link to={`/games/${id}`}>{ft_score}</Link>
                    </td>
                    <td className="head2head__game-half">({ht_score})</td>
                    <td className={v_Class}>
                        <Link to={`/teams/${visitorteam_id}`}>
                            {visitorName}
                        </Link>
                    </td>
                    <td className="head2head__game-date">{date}</td>
                </tr>
            );
        }
    );

export default ViewHead2Head;

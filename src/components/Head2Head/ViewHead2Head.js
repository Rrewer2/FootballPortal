import { Link, useNavigate } from "react-router-dom";
import { getClassName } from "../../services/functions";
import "./head2Head.scss";

const Head2Head = ({
    data: { array, localId, l_name, visitId, v_name },
    args: { onGameSelected, onIdsFinded },
}) => {
    const navigate = useNavigate();
    const lastGames = array.map(
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
                <tr
                    className="head2head__game"
                    key={id}
                    onClick={() => onGameSelected(id)}
                >
                    <td className={l_Class}>{localName}</td>
                    <td className="head2head__game-full">{ft_score}</td>
                    <td className="head2head__game-half">({ht_score})</td>
                    <td className={v_Class}>{visitorName}</td>
                    <td>
                        <i>{date}</i>
                    </td>
                </tr>
            );
        }
    );
    if (localId && visitId) onIdsFinded([{ localId, visitId }]);
    return (
        <article className="head2head">
            <h2 className="head2head__title">Last 10 games:</h2>
            <table>
                <tbody>{lastGames}</tbody>
            </table>
            <Link onClick={() => navigate(-1)} className="head2head__back">
                Back to all games
            </Link>
        </article>
    );
};

export default Head2Head;

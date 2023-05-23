import { getClassName } from "../../services/index";
import { Link } from "react-router-dom";

const TableInfo = (
    {
        localteam_formation,
        visitorteam_formation,
        localteam_score,
        visitorteam_score,
        localteam_position,
        visitorteam_position,
        ht_score,
        ft_score,
        localteam_id,
        visitorteam_id,
        winner_team_id,
    },
    l_name,
    l_logo,
    v_name,
    v_logo
) => {
    const localClass = getClassName(
        localteam_id,
        winner_team_id,
        "single-game"
    );
    const visitClass = getClassName(
        visitorteam_id,
        winner_team_id,
        "single-game"
    );
    return (
        <table className="single-game__table">
            <tbody>
                <tr>
                    <td className="single-game__name grid-2col">
                        <img
                            src={l_logo}
                            alt={l_name}
                            className="single-game__img"
                        />
                        <span className={localClass}>
                            <Link to={`/teams/${localteam_id}`}>{l_name}</Link>
                        </span>
                    </td>
                    <td className="single-game__score">
                        {ft_score} ({ht_score})
                    </td>
                    <td className="single-game__name grid-2col">
                        <img
                            src={v_logo}
                            alt={v_name}
                            className="single-game__img"
                        />
                        <span className={visitClass}>
                            <Link to={`/teams/${visitorteam_id}`}>
                                {v_name}
                            </Link>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>{localteam_formation}</td>
                    <td className="single-game__menu">formation</td>
                    <td>{visitorteam_formation}</td>
                </tr>
                <tr>
                    <td>{localteam_score}</td>
                    <td className="single-game__menu">score</td>
                    <td>{visitorteam_score}</td>
                </tr>
                <tr>
                    <td>{localteam_position}</td>
                    <td className="single-game__menu">position</td>
                    <td>{visitorteam_position}</td>
                </tr>
            </tbody>
        </table>
    );
};
export default TableInfo;

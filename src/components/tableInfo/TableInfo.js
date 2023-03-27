import "./tableInfo.scss";

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
    },
    l_name,
    l_logo,
    v_name,
    v_logo
) => (
    <table className="single-game__table">
        <tbody>
            <tr>
                <td>
                    <img
                        src={l_logo}
                        alt={l_name}
                        className="single-game__img"
                    />
                </td>
                <td className="single-game__price">
                    {ft_score} ({ht_score})
                </td>
                <td>
                    <img
                        src={v_logo}
                        alt={v_name}
                        className="single-game__img"
                    />
                </td>
            </tr>
            <tr className="single-game__descr">
                <td>{localteam_formation}</td>
                <td>formation</td>
                <td>{visitorteam_formation}</td>
            </tr>
            <tr className="single-game__descr">
                <td>{localteam_score}</td>
                <td>score</td>
                <td>{visitorteam_score}</td>
            </tr>
            <tr className="single-game__descr">
                <td>{localteam_position}</td>
                <td>position</td>
                <td>{visitorteam_position}</td>
            </tr>
        </tbody>
    </table>
);

export default TableInfo;

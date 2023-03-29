import { getParametr } from "../../services/functions";
import { yellowcards, redcards } from "../../resources/svg-pictures";
import ballSrc from "../../resources/soccer-ball.png";

const cards = [yellowcards, redcards].map((item, i) => (
    <td key={`cards${i}`}>
        <div className="topscorers-table__img">{item}</div>
    </td>
));

const ViewTopScorers = ({ data }) => {
    if (!data) return <table className="topscorers-table"></table>;

    let elemNames;
    const topscorers = data.map((obj) => {
        const {
            player_id,
            position,
            display_name,
            image_path,
            teamName,
            ...args
        } = obj;
        const param = getParametr(args);
        elemNames = param.includes("yellowcards") ? (
            cards
        ) : param.includes("goals") ? (
            <td>
                <img
                    src={ballSrc}
                    alt="goals"
                    className="topscorers-table__ball"
                />
            </td>
        ) : (
            param.map((item) => (
                <td
                    className="topscorers-table__header"
                    key={`elemName${item}`}
                >
                    {item}
                </td>
            ))
        );
        const elemValues = param.map((item) => (
            <td className="topscorers-table__points" key={`elemValue${item}`}>
                {obj[item]}
            </td>
        ));
        return (
            <tr className="topscorers-table__item" key={player_id}>
                <td className="topscorers-table__position">{position}</td>
                <td className="topscorers-table__name">{display_name}</td>
                <td>
                    <img
                        className="topscorers-table__photo"
                        src={image_path}
                        alt={display_name}
                    />
                </td>
                <td>{teamName}</td>
                {elemValues}
            </tr>
        );
    });
    return (
        <table className="topscorers-table">
            <thead>
                <tr className="topscorers-table__header">
                    <td>Pos</td>
                    <td>Name</td>
                    <td>Photo</td>
                    <td>Team</td>
                    {elemNames}
                </tr>
            </thead>
            <tbody>{topscorers}</tbody>
        </table>
    );
};

export default ViewTopScorers;

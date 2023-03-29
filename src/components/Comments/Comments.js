import ballSrc from "../../resources/soccer-ball.png";
import { yellowcards, redcards } from "../../resources/svg-pictures";
import "./comments.scss";

const commentsData = (data) =>
    data.map(({ important, order, goal, minute, extra_minute, comment }) => (
        <tr
            className={
                important || !minute
                    ? "comments__item-important"
                    : "comments__item"
            }
            key={order}
        >
            <td>
                {extra_minute
                    ? `${minute}+${extra_minute}`
                    : minute
                    ? minute
                    : ""}
            </td>
            <td className="comments__img">
                {goal ? (
                    <img className="comments__img" src={ballSrc} alt="goal" />
                ) : comment.includes("yellow card") ? (
                    yellowcards
                ) : comment.includes("red card") ? (
                    redcards
                ) : (
                    ""
                )}
            </td>
            <td className="comments__descr">{comment}</td>
        </tr>
    ));

const Comments = ({ data }) =>
    !data || !data.length ? (
        <h2>
            Sorry, there are no comments about the progress of this football
            match...
        </h2>
    ) : (
        <table className="comments__table">
            <thead>
                <tr className="comments__title">
                    <td>Minute</td>
                    <td>Event</td>
                    <td>Comments</td>
                </tr>
            </thead>
            <tbody>{commentsData(data)}</tbody>
        </table>
    );

export default Comments;

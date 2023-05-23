import ballSrc from "../../resources/soccer-ball.png";
import { yellowcards, redcards } from "../../resources/svg-pictures";
import { returnIndex } from "../../services/index";

export default function ViewComments(data) {
    const goals = <img className="comments__img" src={ballSrc} alt="goal" />;
    const events = [goals, yellowcards, redcards];

    return data.map(({ important, order, minute, extra_minute, comment }) => (
        <tr
            className={`comments__item${
                important || !minute ? "-important" : ""
            }`}
            key={`${minute} ${order}`}
        >
            <td>
                {minute || ""}
                {!!extra_minute && `+${extra_minute}`}
            </td>
            <td className="comments__img">{events[returnIndex(comment)]}</td>
            <td className="comments__descr">{comment}</td>
        </tr>
    ));
}

import ViewComments from "./ViewComments";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
import "./comments.scss";

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
            <tbody>{ViewComments(data)}</tbody>
        </table>
    );

export default withErrorBoundary(Comments);

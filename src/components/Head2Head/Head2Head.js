import ViewHead2Head from "./ViewHead2Head";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";

const Head2Head = ({ data }) => (
    <article className="head2head">
        <h2 className="head2head__title">Last 10 games:</h2>
        <table className="head2head__table">
            <tbody>{!data?.game ? null : ViewHead2Head(data)}</tbody>
        </table>
    </article>
);

export default withErrorBoundary(Head2Head);

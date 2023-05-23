import ViewGamesList from "./ViewGamesList";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { getYear } from "../../services/index";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
import "./gamesList.scss";

const GamesList = ({ info, loadMore, status }) => {
    if (!info) return <div className="games"></div>;

    const { mainTeam, allTeams, games } = info;

    const text = status === "loading" ? "loading..." : "previous games";

    const seasons = games.map((season, i) => (
        <article className="section-wrapper games__list" key={`season${i}`}>
            <h2 className="games__name">
                {mainTeam.teamName}
                {!i
                    ? " in current season"
                    : ` in season ${getYear(season) - 1} - ${getYear(season)}`}
            </h2>
            <ul className="games__grid">
                {!season ? null : ViewGamesList({ season, allTeams })}
            </ul>
        </article>
    ));

    return (
        <div className="games">
            {seasons}
            {status === "error" && <ErrorMessage />}
            <button
                className="button button__main button__long"
                onClick={loadMore}
                disabled={status === "loading"}
            >
                <div className="inner">{text}</div>
            </button>
        </div>
    );
};

export default withErrorBoundary(GamesList);

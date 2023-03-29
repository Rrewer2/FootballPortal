import ViewGamesList from "./ViewGamesList";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { getYear } from "../../services/functions";
import "./gamesList.scss";

const GamesList = ({ info, loadMore, process }) => {
    if (!info) return <div className="games"></div>;

    const { mainTeam, allTeams, games } = info;

    const errorMessage = process === "error" ? <ErrorMessage /> : null;
    const text = process === "loading" ? "loading..." : "previous games";

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
            {errorMessage}
            <button
                className="button button__main button__long"
                onClick={loadMore}
                disabled={process === "loading"}
            >
                <div className="inner">{text}</div>
            </button>
        </div>
    );
};

export default GamesList;

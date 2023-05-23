import { Link } from "react-router-dom";
import { getTopScorers } from "../../services/index";
import ViewTopScorers from "./ViewTopScorers";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
import "./topScorers.scss";

const TopScorers = ({ slicedTopscorers, teams, allPlayers }) => {
    if (!slicedTopscorers) return <table className="topscorers"></table>;

    const headers = ["Top Scorers", "Top Assists", "Top Cardscorers"];
    const scorers = getTopScorers(slicedTopscorers, teams, allPlayers);

    return (
        <article>
            <Link to={`/scorers`}>
                <h2 className="topscorers-title">Top Players in season</h2>
            </Link>
            <div className="topscorers">
                {!slicedTopscorers
                    ? null
                    : scorers.map((data, i) => (
                          <article
                              className="topscorers-table"
                              key={`topscorers-table${i}`}
                          >
                              <h2>{headers[i]}</h2>
                              <ViewTopScorers data={data} />
                          </article>
                      ))}
            </div>
        </article>
    );
};

export default withErrorBoundary(TopScorers);

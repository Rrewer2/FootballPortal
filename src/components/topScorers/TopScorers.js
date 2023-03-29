import { Link } from "react-router-dom";
import { getTopScorers } from "../../services/functions";
import ViewTopScorers from "./ViewTopScorers";
import "./topScorers.scss";

const TopScorers = ({ data }) => {
    const { slicedTopscorers, teams, allPlayers } = data;

    if (!slicedTopscorers) return <table className="topscorers"></table>;

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
                              <h2>
                                  {!i
                                      ? "Top Scorers"
                                      : i === 1
                                      ? "Top Assists"
                                      : "Top Cardscorers"}
                              </h2>
                              <ViewTopScorers data={data} />
                          </article>
                      ))}
            </div>
        </article>
    );
};

export default TopScorers;

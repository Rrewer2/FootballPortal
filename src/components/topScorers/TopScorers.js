import { getTopScorers } from "../../services/functions";
import ViewTopScorers from "./ViewTopScorers";
import "./topScorers.scss";

const TopScorers = ({ data }) => {
    const { slicedTopcorers, teams, allPlayers } = data;
    console.log(data);
    if (!slicedTopcorers) return <table className="topscorers"></table>;
    console.log(slicedTopcorers, teams, allPlayers);
    const scorers = getTopScorers(slicedTopcorers, teams, allPlayers);

    return (
        <div className="topscorers">
            {scorers.map((data, i) => (
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
    );
};

export default TopScorers;

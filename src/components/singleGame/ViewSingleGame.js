import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Head2Head from "../Head2Head/Head2Head";
import TableInfo from "../tableInfo/TableInfo";
import { getClassName } from "../../services/functions";

const ViewSingleGame = ({ data }) => {
    const navigate = useNavigate();
    if (!data) return;
    const { game, local, visitor, stadion, head2head } = data;

    const { localteam_id, visitorteam_id, winner_team_id, time, temp, date } =
        game;

    const { teamName: l_name, logo_path: l_logo } = local;
    const { teamName: v_name, logo_path: v_logo } = visitor;
    const { capacity, city, name: s_name } = stadion;

    const localClass = getClassName(localteam_id, winner_team_id, "tableInfo");
    const visitorClass = getClassName(
        visitorteam_id,
        winner_team_id,
        "tableInfo"
    );

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${l_name} - ${v_name} game`}
                />
                <title>
                    {l_name} vs {v_name}
                </title>
            </Helmet>
            <div className="single-game">
                <article>
                    <h1>
                        <span className={localClass}>{l_name}</span>
                        <span>{" vs "}</span>
                        <span className={visitorClass}>{v_name}</span>
                    </h1>
                    {TableInfo(game, l_name, l_logo, v_name, v_logo)}
                    <p className="single-game__price">
                        `{time} min, {temp}, {date}`
                    </p>
                    <p className="single-game__descr">
                        {city}, {s_name}
                    </p>
                    <p className="single-game__descr">capacity: {capacity}</p>
                </article>
                <article>
                    <h2 className="single-game__price">Last 10 games:</h2>
                    {Head2Head(
                        head2head,
                        localteam_id,
                        l_name,
                        visitorteam_id,
                        v_name
                    )}
                    <Link
                        onClick={() => navigate(-1)}
                        className="single-game__back"
                    >
                        Back to all games
                    </Link>
                </article>
            </div>
        </>
    );
};

export default ViewSingleGame;

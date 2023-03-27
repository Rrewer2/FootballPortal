import { Helmet } from "react-helmet";
import TableInfo from "../tableInfo/TableInfo";
import { getClassName } from "../../services/functions";
import "./gameInfo.scss";

const ViewGameInfo = ({ data }) => {
    if (!data) return;
    const { game, local, visitor, stadion } = data;

    const { localteam_id, visitorteam_id, winner_team_id, time, temp, date } =
        game;

    const { teamName: l_name, logo_path: l_logo } = local;
    const { teamName: v_name, logo_path: v_logo } = visitor;
    const { capacity, city, name: s_name } = stadion;

    const localClass = getClassName(
        localteam_id,
        winner_team_id,
        "single-game__title"
    );
    const visitClass = getClassName(
        visitorteam_id,
        winner_team_id,
        "single-game__title"
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
            <article className="single-game">
                <h2 className="single-game__title">
                    <span className={localClass}>{l_name}</span>
                    <span>" vs "</span>
                    <span className={visitClass}>{v_name}</span>
                </h2>
                {TableInfo(game, l_name, l_logo, v_name, v_logo)}
                <h3 className="single-game__time">
                    `{time} min, {temp}, {date}`
                </h3>
                <h3 className="single-game__city">
                    {city}, {s_name}
                </h3>
                <h3 className="single-game__capacity">capacity: {capacity}</h3>
            </article>
        </>
    );
};

export default ViewGameInfo;

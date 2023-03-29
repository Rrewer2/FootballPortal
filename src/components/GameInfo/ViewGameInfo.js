import { Helmet } from "react-helmet";
import TableInfo from "./TableInfo";
import "./gameInfo.scss";

const ViewGameInfo = ({
    game,
    local: { teamName: l_name, logo_path: l_logo },
    visitor: { teamName: v_name, logo_path: v_logo },
}) => {
    const { time, temp, date } = game;

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
                {TableInfo(game, l_name, l_logo, v_name, v_logo)}
                <h3 className="single-game__descr">
                    {time} min, {temp}, {date}
                </h3>
            </article>
        </>
    );
};

export default ViewGameInfo;

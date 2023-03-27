import { Link } from "react-router-dom";
import Sceleton from "../skeleton/Skeleton";
import "./teamInfo.scss";

const ViewTeamInfo = ({ data }) => {
    if (!data)
        return (
            <div className="team">
                <Sceleton className="team-sceleton" />
            </div>
        );
    const { team, stadion } = data;
    const { id, teamName, founded, logo_path } = team;
    const { name: s_name, image_path, city, capacity } = stadion;
    return (
        <article className="team">
            <h2 className="team-title">
                {teamName} ({city})
            </h2>
            <article className="team-nav">
                <img src={logo_path} alt={teamName} className="team-nav-img" />
                <nav className="team-btns">
                    <Link
                        to={`/last_games/${id}`}
                        className="button button__secondary"
                    >
                        <div className="inner">last games</div>
                    </Link>
                    <Link
                        to={`/teams/${id}`}
                        className="button button__secondary"
                    >
                        <div className="inner">to page</div>
                    </Link>
                </nav>
            </article>
            <div className="stadion">
                <article className="stadion-info">
                    <h2 className="stadion-title">{s_name}</h2>
                    <h3 className="stadion-subtitle">
                        Capacity: {capacity} peoples
                    </h3>
                    <h3 className="stadion-subtitle">year: {founded}</h3>
                </article>
                <img src={image_path} alt={s_name} className="stadion-img" />
            </div>
        </article>
    );
};

export default ViewTeamInfo;

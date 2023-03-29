import { Link } from "react-router-dom";
import "./teamInfo.scss";

const ViewTeamInfo = ({
    team: { id, teamName, founded, logo_path },
    stadion: { name: s_name, image_path, city, capacity },
}) => (
    <>
        <h2 className="team-title">
            {teamName} ({city})
        </h2>
        <article className="team-nav">
            <img src={logo_path} alt={teamName} className="team-nav-img" />
            <Link to={`/teams/${id}`} className="button button__secondary">
                <div className="inner">to page</div>
            </Link>
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
    </>
);

export default ViewTeamInfo;

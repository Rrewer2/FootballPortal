import { Link } from "react-router-dom";

const ViewTeamInfo = ({ data: { team, stadion } }) => {
    if (!team || !stadion) {
        return (
            <div className="team__games">
                This Team has not a Stadion, sorry...
            </div>
        );
    }
    const { id, teamName, founded, logo_path } = team;
    const { name, surface, image_path, city, capacity, address } = stadion;
    return (
        <div className="team__info">
            <div key={id} className="team__basics">
                <img src={logo_path} alt={teamName} />
                <div>
                    <div className="team__info-name">
                        {teamName} ({city})
                    </div>
                    <div className="team__info-name">year: {founded}</div>
                    <div className="team__btns">
                        <Link
                            to={`/last_games/${id}`}
                            className="button button__main"
                        >
                            <div className="inner">last games</div>
                        </Link>
                        <Link
                            to={`/teams/${id}`}
                            className="button button__secondary"
                        >
                            <div className="inner">to page</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="team__info-name">{name}</div>
            <img
                src={image_path}
                style={{
                    margin: "0 auto",
                    background: "none",
                    display: "block",
                    width: "300px",
                    height: "225px",
                    objectFit: "contain",
                }}
                alt={name}
            />
            <ul className="team__games-list">
                <li className="team__games-item">City: {city}</li>
                <li className="team__games-item">
                    Capacity: {capacity} peoples
                </li>
                <li className="team__games-item">surface: {surface}</li>
                <li className="team__games-item">address: {address}</li>
            </ul>
        </div>
    );
};

export default ViewTeamInfo;

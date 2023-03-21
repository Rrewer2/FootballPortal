import { Link } from "react-router-dom";

const ViewRandomTeam = ({ data: { team, stadion } }) => {
    if (!team || !stadion) {
        return (
            <div style={{ textAlign: "center" }} className="randomteam__name">
                Internet error
                <br />
                Try it again
            </div>
        );
    }
    const { teamName, founded, logo_path, id } = team;
    const { name, city, capacity, address } = stadion;
    return (
        <>
            <div className="randomteam__block">
                <img
                    src={logo_path}
                    alt="Random team"
                    className="randomteam__img"
                />
                <div className="randomteam__info">
                    <p className="randomteam__name">
                        FC {teamName} ({city})
                    </p>
                    <ul>
                        <p className="randomteam__descr">
                            {city}, {address}
                        </p>
                        <p className="randomteam__descr">
                            {name} ({capacity} funs)
                        </p>
                        <p className="randomteam__descr">{founded} year</p>
                    </ul>
                    <div className="randomteam__btns">
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
        </>
    );
};
export default ViewRandomTeam;

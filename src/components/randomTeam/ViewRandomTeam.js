import { Link } from "react-router-dom";

const ViewRandomTeam = ({ data: { team, stadion } }) => {
    if (!team || !stadion) {
        return (
            <h2 className="randomteam__error">
                Internet error
                <br />
                Try it again
            </h2>
        );
    }
    const { teamName, founded, logo_path, id } = team;
    const { name, city, capacity, address } = stadion;
    return (
        <div className="randomteam__block">
            <img
                src={logo_path}
                alt={`${team} logo`}
                className="randomteam__img"
            />
            <article className="randomteam__info">
                <h2 className="randomteam__name">
                    FC {teamName} ({city})
                </h2>

                <h3 className="randomteam__descr">
                    {city}, {address}
                </h3>
                <h3 className="randomteam__descr">
                    {name} ({capacity} funs)
                </h3>
                <h3 className="randomteam__descr">{founded} year</h3>

                <nav className="randomteam__btns">
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
                </nav>
            </article>
        </div>
    );
};
export default ViewRandomTeam;

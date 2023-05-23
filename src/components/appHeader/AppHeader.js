import { Link, NavLink, useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import AppHeaderForm from "./AppHeaderForm";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
import "./appHeader.scss";

const AppHeader = ({ setCountry, flag, status, team, game }) => {
    const navigate = useNavigate();

    return (
        <header className="app-header">
            <Link to="/" className="app-header__link">
                <h2
                    className={
                        !team && !game
                            ? "app-header__title"
                            : "app-header__pale"
                    }
                >
                    <span>Football</span> information portal
                </h2>
            </Link>
            {!team && !game ? (
                <AppHeaderForm setCountry={setCountry} />
            ) : team ? (
                <h1 className="app-header__team-name">{team?.teamName}</h1>
            ) : (
                <h1 className="app-header__game-name">
                    {`${game.local.teamName} vs ${game.visitor.teamName}`}
                </h1>
            )}
            {status === "loading" ? (
                <Spinner className="spinner" />
            ) : !game ? (
                <img
                    src={!team ? flag : team.logo_path}
                    alt="flag"
                    className={!team ? "app-header__img" : "app-header__logo"}
                />
            ) : (
                <h2 className="app-header__score">{game?.game?.ft_score}</h2>
            )}
            <nav className="app-header__menu">
                <NavLink className="app-header__nav" to="/">
                    Teams
                </NavLink>
                <p>/</p>
                <Link className="app-header__nav" onClick={() => navigate(-1)}>
                    Back
                </Link>
            </nav>
        </header>
    );
};

export default withErrorBoundary(AppHeader);

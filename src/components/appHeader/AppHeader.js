import { Link, NavLink, useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import "./appHeader.scss";

const AppHeader = ({ onCountrySelected, flag, process }) => {
    const navigate = useNavigate();

    const isLoading = process === "loading";

    return (
        <header className="app-header">
            <Link to="/" className="app-header__link">
                <h1 className="app-header__title">
                    <span>Football</span> information portal
                </h1>
            </Link>
            <form className="app-header__select" onChange={onCountrySelected}>
                <label className="app-header__country" htmlFor="Scotland">
                    <input
                        type="radio"
                        id="Scotland"
                        name="selectedCountry"
                        value="Scotland"
                        defaultChecked
                    />
                    Scotland
                </label>

                <label className="app-header__country" htmlFor="Denmark">
                    <input
                        type="radio"
                        id="Denmark"
                        name="selectedCountry"
                        value="Denmark"
                    />
                    Denmark
                </label>
            </form>
            {isLoading || !flag ? (
                <Spinner className="spinner" />
            ) : (
                <img src={flag} alt="flag" className="app-header__img" />
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

export default AppHeader;

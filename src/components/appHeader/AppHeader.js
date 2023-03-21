import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFootballService from "../../services/FootballService";
import "./appHeader.scss";

const AppHeader = ({ onCountrySelected }) => {
    const defValue = 1161;

    const [countryId, setCountryId] = useState(defValue);
    const [flag, setFlag] = useState(null);

    const { getFlag } = useFootballService();

    const updateFlag = () => {
        getFlag(countryId).then(setFlag);
    };

    useEffect(updateFlag, [countryId]);
    const navigate = useNavigate();

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Football</span> information portal
                </Link>
            </h1>
            <form
                className="app__select"
                onChange={(e) => {
                    onCountrySelected(e.target.value);
                    setCountryId(e.target.value);
                }}
            >
                <input
                    type="radio"
                    id="Scotland"
                    name="selectedCountry"
                    value={1161}
                    defaultChecked
                />
                <label className="app__title" htmlFor="Scotland">
                    Scotland
                </label>
                <input
                    type="radio"
                    id="Denmark"
                    name="selectedCountry"
                    value={320}
                />
                <label className="app__title" htmlFor="Denmark">
                    Denmark
                </label>
            </form>
            <img src={flag} alt="" />
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                "app__menu" + (isActive ? "_nav" : "")
                            }
                            to="/"
                        >
                            Teams
                        </NavLink>
                    </li>
                    /
                    <li>
                        <Link
                            className="app__menu"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewGamesList from "./ViewGamesList";
import useFootballService from "../../services/FootballService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./gamesList.scss";

const GamesList = () => {
    const { teamId } = useParams();
    const firstMonth = 1;
    const [games, setGames] = useState(null);
    const [teams, setTeams] = useState(null);
    const [month, setMonth] = useState(firstMonth);
    const [message, setMessage] = useState(null);

    const { process, setProcess, cleanError, getAllGamesByDate, getGamesList } =
        useFootballService();

    const updateGames = (month, teamId) => {
        if (month && teamId) {
            cleanError();
            getAllGamesByDate(month, teamId).then(onGamesLoaded);
        }
    };

    const onGamesLoaded = ({ newGames, period }) => {
        setProcess("render");
        if (month > firstMonth) {
            setGames((games) => [...games, ...newGames]);
        } else {
            setGames(newGames);
        }
        if (!newGames.length) {
            setMessage(
                `Sorry, there were no games in this period: ${period}. Try again`
            );
        } else {
            setMessage(null);
        }
    };

    const updateTeams = () => {
        cleanError();
        setGames(null);
        setMonth(firstMonth + 1);
        getGamesList(teamId).then(setTeams);
        setProcess("render");
    };

    useEffect(() => updateGames(month, teamId), [teamId]);
    useEffect(updateTeams, [teamId]);

    const loadMore = () => {
        updateGames(month, teamId);
        setMonth((month) => month + 1);
    };

    const unique = (arr) => [...new Set(arr)];

    const errorMessage = process === "error" ? <ErrorMessage /> : null;
    const text = process === "loading" ? "loading..." : "previous games";
    const loadingError = message ? (
        <div className="games__error">{message}</div>
    ) : null;

    return (
        <div className="games__list">
            {ViewGamesList(unique(games), teams)}
            {errorMessage}
            <button
                className="button button__main button__long"
                onClick={loadMore}
            >
                <div className="inner">{text}</div>
            </button>
            {loadingError}
        </div>
    );
};

export default GamesList;

import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import AppBanner from "../components/appBanner/AppBanner";
import GamesList from "../components/gamesList/GamesList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewGamesList from "../components/gamesList/ViewGamesList";
import useFootballService from "../services/footballService";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const GamesListPage = () => {
    const { teamId } = useParams();
    const firstMonth = 12;
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
        <>
            <AppBanner />
            <ErrorBoundary>
                <GamesList />
            </ErrorBoundary>
        </>
    );
};

export default GamesListPage;

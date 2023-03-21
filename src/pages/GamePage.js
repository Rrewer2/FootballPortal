import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import AppBanner from "../components//appBanner/AppBanner";
import GamesList from "../components//gamesList/GamesList";

const GamePage = () => {
    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <GamesList />
            </ErrorBoundary>
        </>
    );
};

export default GamePage;

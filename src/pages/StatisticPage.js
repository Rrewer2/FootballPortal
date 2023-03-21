import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import SingleGame from "../components/singleGame/SingleGame";

const StatisticPage = () => {
    return (
        <ErrorBoundary>
            <SingleGame />
        </ErrorBoundary>
    );
};

export default StatisticPage;

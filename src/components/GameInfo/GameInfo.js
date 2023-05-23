import ViewGameInfo from "./ViewGameInfo";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";

const GameInfo = ({ data }) => (!data?.game ? null : ViewGameInfo(data));

export default withErrorBoundary(GameInfo);

import ViewGameInfo from "./ViewGameInfo";

const GameInfo = ({ data }) => (!data ? null : ViewGameInfo(data));

export default GameInfo;

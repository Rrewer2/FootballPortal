import LayoutComponent from "../layoutComponent/LayoutComponent";
import ViewGameInfo from "./ViewGameInfo";

const GameInfo = ({ selectedGame, gameId }) => (
    <LayoutComponent
        Component={ViewGameInfo}
        funcName="getGameInfo"
        param={[selectedGame, gameId]}
    />
);

export default GameInfo;

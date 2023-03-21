import { useParams } from "react-router-dom";
import ViewSingleGame from "./ViewSingleGame";
import LayoutComponent from "../layoutComponent/LayoutComponent";
import "./singleGame.scss";

const SingleGame = () => {
    const { gameId } = useParams();

    return (
        <LayoutComponent
            Component={ViewSingleGame}
            funcName="getSingleGame"
            param={gameId}
        />
    );
};

export default SingleGame;

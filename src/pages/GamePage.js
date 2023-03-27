import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Head2Head from "../components/Head2Head/Head2Head";
import GameInfo from "../components/GameInfo/GameInfo";
import Standings from "../components/standings/Standings";

const GamePage = ({ selectedCountry }) => {
    const { gameId } = useParams();
    const [selectedGame, setSelectedGame] = useState(null);
    const onGameSelected = (id) => {
        setSelectedGame(id);
    };

    const [ids, setIds] = useState([]);
    const onIdsFinded = (ids) => {
        // setIds(ids);
    };

    return (
        <div className="game-content">
            <ErrorBoundary>
                <GameInfo selectedGame={selectedGame} gameId={gameId} />
            </ErrorBoundary>

            <ErrorBoundary>
                <Head2Head
                    onGameSelected={onGameSelected}
                    gameId={gameId}
                    onIdsFinded={onIdsFinded}
                />
            </ErrorBoundary>

            <ErrorBoundary>
                <Standings ids={ids} selectedCountry={selectedCountry} />
            </ErrorBoundary>
        </div>
    );
};

export default GamePage;

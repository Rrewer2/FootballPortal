import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFootballService from "../services/footballService";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Spinner from "../components/spinner/Spinner";
import Head2Head from "../components/Head2Head/Head2Head";
import GameInfo from "../components/GameInfo/GameInfo";
import Comments from "../components/Comments/Comments";

const GamePage = ({ onGameSelected }) => {
    let { gameId } = useParams();
    const [info, setInfo] = useState(null);
    const { process, setProcess, cleanError, gamePageInfo } =
        useFootballService();

    const updateInfo = (gameId) => {
        if (!gameId) return;
        cleanError();
        gamePageInfo(gameId)
            .then((newInfo) => {
                setProcess("render");
                setInfo(newInfo);
                onGameSelected(newInfo);
            })
            .catch((e) => {
                console.log(e);
                setProcess("error");
            });
    };

    useEffect(() => {
        updateInfo(gameId);
        return () => {
            onGameSelected(null);
        };
    }, [gameId]);
    if (process === "loading")
        return (
            <div className="main-spinner">
                <Spinner />
            </div>
        );

    return (
        <div className="main">
            <section className="section-wrapper grid-2col">
                <ErrorBoundary>
                    <GameInfo data={info} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Head2Head data={info?.head2Head} />
                </ErrorBoundary>
            </section>

            <section className="section-wrapper">
                <ErrorBoundary>
                    <Comments data={info?.comments} />
                </ErrorBoundary>
            </section>
        </div>
    );
};

export default GamePage;

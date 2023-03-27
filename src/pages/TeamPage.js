import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useFootballService from "../services/footballService";
import { newGenerator, separateArray } from "../services/functions";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import GamesList from "../components/gamesList/GamesList";
import TopScorers from "../components/topScorers/TopScorers";

const TeamPage = ({ newPeriod, data }) => {
    const { teamId } = useParams();
    const [info, setInfo] = useState(null);
    const { process, setProcess, cleanError, teamPageInfo } =
        useFootballService();

    const updateInfo = (period, teamId, topScorers) => {
        if (!topScorers) return;
        cleanError();
        teamPageInfo({ period, teamId: +teamId, topScorers })
            .then((newInfo) => {
                setProcess("render");
                !info
                    ? setInfo(() => ({
                          ...newInfo,
                          games: separateArray(newInfo.games),
                      }))
                    : setInfo((info) => ({
                          ...info,
                          games: separateArray([
                              ...info.games.flat(),
                              ...newInfo.games,
                          ]),
                      }));
            })
            .catch((e) => {
                console.log(e);
                setProcess("error");
            });
    };

    useEffect(() => {
        loadMore();
        return () => (newPeriod = newGenerator(12));
    }, [data.topScorers]);
    const loadMore = () =>
        updateInfo(newPeriod.next().value, teamId, data.topScorers);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`Page with info about ${
                        info?.mainTeam?.teamName ?? ""
                    }`}
                />
                <title>{info?.mainTeam?.teamName ?? ""} page</title>
            </Helmet>
            <section className="section-wrapper">
                <TopScorers data={{ ...data, ...info }} />
            </section>
            <ErrorBoundary>
                <GamesList info={info} loadMore={loadMore} process={process} />
            </ErrorBoundary>
            {/* <section className="section-wrapper">
                <ErrorBoundary>
                    <Squad info={info} />
                </ErrorBoundary>
            </section> */}
        </>
    );
};

export default TeamPage;

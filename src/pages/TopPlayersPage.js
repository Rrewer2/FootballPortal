import { useState, useEffect } from "react";
import useFootballService from "../services/footballService";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Spinner from "../components/spinner/Spinner";
import AppBanner from "../components/appBanner/AppBanner";
import TopScorers from "../components/topScorers/TopScorers";

const TopPlayersPage = ({ data }) => {
    const [info, setInfo] = useState(null);
    const { process, setProcess, cleanError, topPlayersPageInfo } =
        useFootballService();

    const updateInfo = () => {
        if (!data?.topScorers) return;
        cleanError();
        topPlayersPageInfo(data.topScorers)
            .then((newInfo) => {
                setProcess("render");
                setInfo(newInfo);
            })
            .catch((e) => {
                console.log(e);
                setProcess("error");
            });
    };

    useEffect(() => {
        updateInfo();
    }, [data.topScorers]);

    if (process === "loading")
        return (
            <div className="main-spinner">
                <Spinner />
            </div>
        );

    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <section className="section-wrapper">
                    <TopScorers data={{ ...data, ...info }} />
                </section>
            </ErrorBoundary>
        </>
    );
};

export default TopPlayersPage;

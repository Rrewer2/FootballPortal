import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useFootballService from "../services/footballService";

import TeamList from "../components/teamList/TeamList";
import TeamInfo from "../components/teamInfo/TeamInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Spinner from "../components/spinner/Spinner";
// import SearchForm from "../components/searchForm/SearchForm";
import Standings from "../components/standings/Standings";
import TopScorers from "../components/topScorers/TopScorers";

const MainPage = ({ data }) => {
    const [info, setInfo] = useState({});
    const [selectedTeam, setTeamId] = useState(null);
    const { process, setProcess, cleanError, mainPageInfo } =
        useFootballService();

    const { season_id, teams, topScorers } = data;
    const updateInfo = (season_id, topScorers) => {
        if (!season_id) return;
        cleanError();
        mainPageInfo({ season_id, topScorers })
            .then((data) => {
                setProcess("render");
                setInfo(data);
            })
            .catch((e) => {
                console.log(e);
                setProcess("error");
            });
    };
    useEffect(() => updateInfo(season_id, topScorers), [season_id]);

    const { venues, standings } = info;
    if (process === "loading" && !venues)
        return (
            <div className="main-spinner">
                <Spinner />
            </div>
        );
    const onTeamSelected = (team_id) => {
        const team = teams.find(({ id }) => id === team_id);
        const stadion = venues.find(({ id }) => id === team.venue_id);
        setTeamId({ team, stadion });
    };

    return (
        <main className="main">
            <Helmet>
                <meta
                    name="description"
                    content="Football information portal"
                />
                <title>Football information portal</title>
            </Helmet>

            <section className="section-wrapper">
                <ErrorBoundary>
                    <TeamList teams={teams} onTeamSelected={onTeamSelected} />
                </ErrorBoundary>
            </section>

            <section className="section-wrapper grid-2col">
                <ErrorBoundary>
                    <Standings
                        standings={standings}
                        selectedTeams={[selectedTeam?.team?.id]}
                    />
                </ErrorBoundary>

                <ErrorBoundary>
                    <TeamInfo selectedTeam={selectedTeam} />
                </ErrorBoundary>
            </section>

            <section className="section-wrapper">
                <TopScorers data={{ ...data, ...info }} />
            </section>

            {/* <section className="section-wrapper">
                <ErrorBoundary>
                    <SearchForm />
                </ErrorBoundary>
            </section> */}
        </main>
    );
};

export default MainPage;

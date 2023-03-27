import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useFootballService from "../services/footballService";

import RandomTeam from "../components/randomTeam/RandomTeam";
import ViewTeamList from "../components/teamList/ViewTeamList";
import ViewTeamInfo from "../components/teamInfo/ViewTeamInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import SearchForm from "../components/searchForm/SearchForm";
import ViewStandings from "../components/standings/ViewStandings";
import TopScorers from "../components/topScorers/TopScorers";

const MainPage = ({ data }) => {
    const [info, setInfo] = useState({});
    const [selectedTeam, setTeamId] = useState(null);
    const { process, setProcess, cleanError, mainPageInfo } =
        useFootballService();
    // if (!data) return <main className="main"></main>;

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
    if (!venues) return;
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
                    <ViewTeamList data={teams} args={{ onTeamSelected }} />
                </ErrorBoundary>
            </section>

            <section className="section-wrapper grid-2col">
                <ErrorBoundary>
                    <ViewStandings
                        data={standings}
                        args={{ ids: [selectedTeam?.team?.id] }}
                    />
                </ErrorBoundary>

                <ErrorBoundary>
                    <ViewTeamInfo data={selectedTeam} />
                </ErrorBoundary>
            </section>

            <section className="section-wrapper">
                <TopScorers data={{ ...data, ...info }} />
            </section>

            {/* <section className="section-wrapper">
                <ErrorBoundary>
                    <RandomTeam teams={teams} venues={venues} />
                </ErrorBoundary>
            </section> */}

            <section className="section-wrapper">
                <ErrorBoundary>
                    <SearchForm />
                </ErrorBoundary>
            </section>
        </main>
    );
};

export default MainPage;

import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
// import useFootballService from "../services/FootballService";
import RandomTeam from "../components/randomTeam/RandomTeam";
import TeamList from "../components/teamList/TeamList";
import TeamInfo from "../components/teamInfo/TeamInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import SearchForm from "../components/searchForm/SearchForm";
import Standings from "../components/standings/Standings";

const MainPage = ({ selectedCountry }) => {
    const [selectedTeam, setTeamId] = useState(null);
    // const [allteams, setAllTeams] = useState(null);

    // const { process, setProcess, cleanError, getAllTeams } =
    // useFootballService();

    const onTeamSelected = (id) => {
        setTeamId(id);
    };
    // const updateTeams = (selectedCountry) => {
    //     cleanError();
    //     getAllTeams(selectedCountry).then(setAllTeams);
    //     setProcess("render");
    // };
    // const memoTeams = useMemo(
    //     () => updateTeams(selectedCountry),
    //     [selectedCountry]
    // );
    // useEffect(() => memoTeams(), [selectedCountry]);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Football information portal"
                />
                <title>Football information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomTeam selectedCountry={selectedCountry} />
            </ErrorBoundary>

            <div className="team__content">
                <ErrorBoundary>
                    <TeamList
                        onTeamSelected={onTeamSelected}
                        selectedCountry={selectedCountry}
                    />
                </ErrorBoundary>

                <div>
                    <ErrorBoundary>
                        <TeamInfo teamId={selectedTeam} />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <Standings selectedCountry={selectedCountry} />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <SearchForm />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    );
};

export default MainPage;

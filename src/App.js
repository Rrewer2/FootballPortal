import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useFootballService from "./services/footballService";
import AppHeader from "./components/appHeader/AppHeader";
import Spinner from "./components/spinner/Spinner";

const Page404 = lazy(() => import("./pages/404"));
const MainPage = lazy(() => import("./pages/MainPage"));
const GamePage = lazy(() => import("./pages/GamePage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const TopPlayersPage = lazy(() => import("./pages/TopPlayersPage"));

const App = () => {
    const [selectedCountry, setCountry] = useState("Scotland");
    const onCountrySelected = ({ target: { value } }) => {
        setCountry(value);
    };

    const [selectedTeam, setTeam] = useState(null);
    const onTeamSelected = (team) => {
        setTeam(team);
    };

    const [selectedGame, setGame] = useState(null);
    const onGameSelected = (game) => {
        setGame(game);
    };

    const [info, setInfo] = useState({});

    const { process, setProcess, cleanError, appInfo } = useFootballService();
    const updateInfo = () => {
        cleanError();
        appInfo(selectedCountry)
            .then((data) => {
                setProcess("render");
                setInfo(data);
            })
            .catch((e) => {
                console.log(e);
                setProcess("error");
            });
    };

    useEffect(updateInfo, [selectedCountry]);

    return (
        <Router>
            <div className="app">
                <AppHeader
                    onCountrySelected={onCountrySelected}
                    flag={info?.image_path}
                    process={process}
                    team={selectedTeam}
                    game={selectedGame}
                />
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<MainPage data={info} />} />

                        <Route
                            path="/games/:gameId"
                            element={
                                <GamePage onGameSelected={onGameSelected} />
                            }
                        />

                        <Route
                            path="/teams/:teamId"
                            element={
                                <TeamPage
                                    data={info}
                                    onTeamSelected={onTeamSelected}
                                />
                            }
                        />

                        <Route
                            path="/scorers"
                            element={<TopPlayersPage data={info} />}
                        />

                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
                <footer className="footer"></footer>
            </div>
        </Router>
    );
};

export default App;

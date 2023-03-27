import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useFootballService from "./services/footballService";
import AppHeader from "./components/appHeader/AppHeader";
import Spinner from "./components/spinner/Spinner";
import { newGenerator } from "./services/functions";

const Page404 = lazy(() => import("./pages/404"));
const MainPage = lazy(() => import("./pages/MainPage"));
const GamesListPage = lazy(() => import("./pages/GamesListPage"));
const GamePage = lazy(() => import("./pages/GamePage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));

let newPeriod = newGenerator(12);

const App = () => {
    const [selectedCountry, setCountry] = useState("Scotland");
    const onCountrySelected = ({ target: { value } }) => {
        setCountry(value);
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
                />
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<MainPage data={info} />} />

                        <Route
                            path="/last_games/:teamId/"
                            element={<GamesListPage />}
                        />

                        <Route path="/games/:gameId" element={<GamePage />} />

                        <Route
                            path="/teams/:teamId"
                            element={
                                <TeamPage newPeriod={newPeriod} data={info} />
                            }
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

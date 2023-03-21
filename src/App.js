import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "./components/appHeader/AppHeader";
import Spinner from "./components/spinner/Spinner";

const Page404 = lazy(() => import("./pages/404"));
const MainPage = lazy(() => import("./pages/MainPage"));
const GamePage = lazy(() => import("./pages/GamePage"));
const StatisticPage = lazy(() => import("./pages/StatisticPage"));
const SingleTeam = lazy(() => import("./components/singleTeam/SingleTeam"));

const App = () => {
    const [selectedCountry, setCountry] = useState(1161);

    const onCountrySelected = (data) => {
        setCountry(data);
    };

    return (
        <Router>
            <div className="app">
                <AppHeader onCountrySelected={onCountrySelected} />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <MainPage
                                        selectedCountry={selectedCountry}
                                    />
                                }
                            />

                            <Route
                                path="/last_games/:teamId/"
                                element={<GamePage />}
                            />

                            <Route
                                path="/games/:gameId"
                                element={<StatisticPage />}
                            />

                            <Route
                                path="/teams/:teamId"
                                element={<SingleTeam />}
                            />

                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;

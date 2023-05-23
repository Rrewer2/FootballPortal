import { lazy, Suspense, useState } from "react";
import useMyEffect from "./hooks/useMyEffect";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "./components/appHeader/AppHeader";
import Spinner from "./components/spinner/Spinner";

const Page404 = lazy(() => import("./pages/404"));
const MainPage = lazy(() => import("./pages/MainPage"));
const GamePage = lazy(() => import("./pages/GamePage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const TopPlayersPage = lazy(() => import("./pages/TopPlayersPage"));

export default function App() {
    // return <Spinner />;
    const [country, setCountry] = useState("Scotland");
    const [data, status] = useMyEffect("appInfo", country);
    const [team, setTeam] = useState(null);
    const [game, setGame] = useState(null);

    const routes = (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<MainPage {...data} />} />
                <Route
                    path="/games/:gameId"
                    element={<GamePage setGame={setGame} />}
                />
                <Route
                    path="/teams/:teamId"
                    element={<TeamPage {...{ data, setTeam }} />}
                />
                <Route path="/scorers" element={<TopPlayersPage {...data} />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Suspense>
    );
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader
                    {...{ setCountry, status, team, game }}
                    flag={data?.image_path}
                />
                {status === "error" && <h2>Error Internet Connection</h2>}
                {status === "loading" && <Spinner />}
                {status === "render" && routes}
                <footer className="footer"></footer>
            </div>
        </BrowserRouter>
    );
}

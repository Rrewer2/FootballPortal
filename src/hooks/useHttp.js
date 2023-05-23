import { useRef, useState } from "react";
import { extractData } from "../services/index";

export default function useHttp() {
    const [status, setStatus] = useState("loading");
    const ref = useRef(null);

    const request = async (
        url,
        method = "GET",
        body = null,
        headers = { "Content-Type": "application/json" }
    ) => {
        if (ref.current === url) return;
        ref.current = url;
        setStatus("loading");
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${url}, status: ${response.status}`
                );
            }
            setStatus("render");
            return await response.json();
        } catch (error) {
            setStatus("error");
            console.log(error);
            throw new Error(error);
        } finally {
            ref.current = null;
        }
    };

    const apiBase = process.env.REACT_APP_APIBASE;
    const apiToken = `?api_token=${process.env.REACT_APP_APITOKEN}`;

    const getFromAPI =
        (baseURL, token, cb) =>
        (chapter) =>
        async (endpoint, page = "") =>
            cb(await request(`${baseURL}${chapter}${endpoint}${token}${page}`));

    const getDataFromApi = getFromAPI(apiBase, apiToken, extractData);

    return {
        getAllCountry: getDataFromApi("countries"),
        getCountry: getDataFromApi("countries/"),
        getTeam: getDataFromApi("teams/"),
        getFixtures: getDataFromApi("fixtures/"),
        getHeadToHead: getDataFromApi("head2head/"),
        getRankings: getDataFromApi("standings/season/"),
        getAllVenues: getDataFromApi("venues/season/"),
        getallTeams: getDataFromApi("teams/season/"),
        getTopScorers: getDataFromApi("topscorers/season/"),
        getPlayer: getDataFromApi("players/"),
        getCommentaries: getDataFromApi("commentaries/fixture/"),
        status,
    };
}

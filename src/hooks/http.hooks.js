import { useState, useCallback } from "react";

const useHttp = () => {
    const [process, setProcess] = useState("loading");

    const request = useCallback(
        async (
            url,
            method = "GET",
            body = null,
            headers = { "Content-Type": "application/json" }
        ) => {
            setProcess("loading");
            try {
                const response = await fetch(url, { method, body, headers });
                if (!response.ok) {
                    throw new Error(
                        `Could not fetch ${url}, status: ${response.status}`
                    );
                }

                const data = await response.json();

                return data;
            } catch (error) {
                setProcess("error");
                throw error;
            }
        },
        []
    );

    const cleanError = useCallback(() => {
        setProcess("loading");
    }, []);

    const _apiBase = "https://soccer.sportmonks.com/api/v2.0/";
    const _apiToken =
        "?api_token=NxNGqgpNVYAkId7YahZNUBRqz3g69rlNzCyYnb9JWvbJ9WzksabHFKm2d6pF";
    const extractData = ({ data }) => data;
    const getFromAPI = (baseURL, token, cb) => (chapter) => async (endpoint) =>
        cb(await request(`${baseURL}${chapter}${endpoint}${token}`));

    const getDataFromApi = getFromAPI(_apiBase, _apiToken, extractData);
    return { getDataFromApi, cleanError, process, setProcess };
};
export default useHttp;

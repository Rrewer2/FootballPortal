import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useFootballService from "../hooks/useFootballService";
import { newGenerator, setInfoSettings } from "../services/index";
import GamesList from "../components/gamesList/GamesList";
import TopScorers from "../components/topScorers/TopScorers";

let newPeriod = newGenerator(12);

export default function TeamPage({ data, setTeam }) {
    const { teamId } = useParams();
    const [info, setInfo] = useState(null);
    const ref = useRef(null);
    const { status, teamPageInfo } = useFootballService();

    const setAllInfo = (res) => {
        setInfo((prev) => setInfoSettings(prev, res));
        setTeam(res.mainTeam);
    };

    useEffect(() => {
        const bbb = data?.topScorers;
        if (bbb && ref.current !== bbb) {
            ref.current = bbb;
            loadMore();
        }
        return () => {
            newPeriod = newGenerator(12);
            setTeam(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.topScorers]);

    const loadMore = async () =>
        setAllInfo(
            await teamPageInfo({
                period: newPeriod.next().value,
                teamId: +teamId,
                topScorers: data.topScorers,
            })
        );

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`Page with info about ${
                        info?.mainTeam?.teamName ?? ""
                    }`}
                />
                <title>{info?.mainTeam?.teamName ?? ""} page</title>
            </Helmet>
            <div className="main">
                <section className="section-wrapper">
                    <TopScorers {...data} {...info} />
                </section>
                <GamesList info={info} loadMore={loadMore} status={status} />
                {/* <section className="section-wrapper">
                    <Squad info={info} />
                </section> */}
            </div>
        </>
    );
}

import useMyEffect from "../hooks/useMyEffect";
import { Helmet } from "react-helmet";
import AppBanner from "../components/appBanner/AppBanner";
import TopScorers from "../components/topScorers/TopScorers";

export default function TopPlayersPage(data) {
    const [info, status] = useMyEffect(
        "topPlayersPageInfo",
        data.topScorers,
        data
    );

    return (
        <>
            <Helmet>
                <meta name="description" content="Top players page" />
                <title>Top players</title>
            </Helmet>
            <AppBanner />
            <section className="section-wrapper">
                <TopScorers {...data} {...info} />
            </section>
        </>
    );
}

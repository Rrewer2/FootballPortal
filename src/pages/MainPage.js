import { useState } from "react";
import useMyEffect from "../hooks/useMyEffect";
import { Helmet } from "react-helmet";

import TeamList from "../components/teamList/TeamList";
import TeamInfo from "../components/teamInfo/TeamInfo";
import Standings from "../components/standings/Standings";
import TopScorers from "../components/topScorers/TopScorers";

export default function MainPage(data) {
    const [info, status] = useMyEffect("mainPageInfo", data.season_id, data);
    const [selectedTeam, setTeamId] = useState(null);

    const onTeamSelected = (team_id) => {
        const team = data.teams.find(({ id }) => id === team_id);
        const stadion = info.venues.find(({ id }) => id === team.venue_id);
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
                <TeamList teams={data.teams} onTeamSelected={onTeamSelected} />
            </section>

            <section className="section-wrapper grid-2col">
                <Standings
                    standings={info.standings}
                    selectedTeams={[selectedTeam?.team?.id]}
                />

                <TeamInfo selectedTeam={selectedTeam} />
            </section>

            <section className="section-wrapper">
                <TopScorers {...data} {...info} />
            </section>
        </main>
    );
}

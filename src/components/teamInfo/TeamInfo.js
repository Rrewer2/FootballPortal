import ViewTeamInfo from "./ViewTeamInfo";
import Sceleton from "../skeleton/Skeleton";
import "./teamInfo.scss";

const TeamInfo = ({ selectedTeam }) => (
    <article className="team">
        {!selectedTeam ? (
            <Sceleton className="team-sceleton" />
        ) : (
            ViewTeamInfo(selectedTeam)
        )}
    </article>
);

export default TeamInfo;

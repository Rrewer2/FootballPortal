import ViewTeamInfo from "./ViewTeamInfo";
import Sceleton from "../skeleton/Skeleton";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
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

export default withErrorBoundary(TeamInfo);

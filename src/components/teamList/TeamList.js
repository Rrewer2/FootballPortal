import ViewTeamList from "./ViewTeamList";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
import "./teamList.scss";

const TeamList = ({ teams, onTeamSelected }) => (
    <ul className="team__grid">
        {!teams ? null : ViewTeamList(teams, onTeamSelected)}
    </ul>
);

export default withErrorBoundary(TeamList);

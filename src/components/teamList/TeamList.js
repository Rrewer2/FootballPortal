import ViewTeamList from "./ViewTeamList";
import "./teamList.scss";

const TeamList = ({ teams, onTeamSelected }) => (
    <ul className="team__grid">
        {!teams ? null : ViewTeamList(teams, onTeamSelected)}
    </ul>
);

export default TeamList;

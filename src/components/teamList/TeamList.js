import ViewTeamList from "./ViewTeamList";
import LayoutComponent from "../layoutComponent/LayoutComponent";
import "./teamList.scss";

const TeamList = ({ onTeamSelected, selectedCountry }) => (
    <LayoutComponent
        Component={ViewTeamList}
        funcName={"getAllTeams"}
        param={selectedCountry}
        onTeamSelected={onTeamSelected}
    />
);

export default TeamList;

import ViewTeamInfo from "./ViewTeamInfo";
import LayoutComponent from "../layoutComponent/LayoutComponent";
import Sceleton from "../skeleton/Skeleton";
import "./teamInfo.scss";

const TeamInfo = ({ teamId }) => {
    if (!teamId) {
        return <Sceleton />;
    }
    return (
        <LayoutComponent
            Component={ViewTeamInfo}
            funcName="getTeamInfoById"
            param={teamId}
        />
    );
};

export default TeamInfo;

import { useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import LayoutComponent from "../layoutComponent/LayoutComponent";
import ViewTeamInfo from "../teamInfo/ViewTeamInfo";
import { Helmet } from "react-helmet";
import "./singleTeam.scss";

const SingleTeam = () => {
    const { teamId } = useParams();

    // const TeamLayout = LayoutComponent({
    //     Component: ViewTeamInfo,
    //     funcName: "getTeamInfoById",
    //     param: teamId,
    // });

    // let title = TeamLayout.props.data?.team?.teamName ?? teamId;
    return (
        <>
            <Helmet>
                <meta name="description" content={`${teamId} information`} />
                <title>{`${teamId} team page`}</title>
            </Helmet>
            <AppBanner />
            <LayoutComponent
                Component={ViewTeamInfo}
                funcName="getTeamInfoById"
                param={teamId}
            />
        </>
    );
};

export default SingleTeam;

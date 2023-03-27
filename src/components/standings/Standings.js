import ViewStandings from "./ViewStandings";
import LayoutComponent from "../layoutComponent/LayoutComponent";
import "./standings.scss";

const Standings = ({ selectedCountry, ids = [] }) => (
    <LayoutComponent
        Component={ViewStandings}
        funcName="getStandings"
        param={selectedCountry}
        ids={ids}
    />
);

export default Standings;

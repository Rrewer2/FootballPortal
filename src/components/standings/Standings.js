import ViewStandings from "./ViewStandings";
import LayoutComponent from "../layoutComponent/LayoutComponent";
import "./standings.scss";

const Standings = ({ selectedCountry }) => (
    <LayoutComponent
        Component={ViewStandings}
        funcName="getStandings"
        param={selectedCountry}
    />
);

export default Standings;

import ViewRandomTeam from "./ViewRandomTeam";
import LayoutComponent from "../layoutComponent/LayoutComponent";
import "./randomTeam.scss";
import ball from "../../resources/Football-Ball-PNG.png";

const RandomTeam = ({ selectedCountry }) => {
    const randomTeamLayout = LayoutComponent({
        Component: ViewRandomTeam,
        funcName: "getRandomTeam",
        param: selectedCountry,
    });

    const { updateData, process } = randomTeamLayout.props;
    const isLoading = process === "loading";

    return (
        <div className="randomteam">
            {randomTeamLayout}
            <div className="randomteam__static">
                <p className="randomteam__title">
                    Random team for today!
                    <br />
                    Do you want to get to know about him better?
                </p>
                <p className="randomteam__title">Or choose another one</p>
                <button
                    className="button button__main"
                    onClick={() => updateData(selectedCountry)}
                    disabled={isLoading}
                >
                    <div className="inner">
                        {isLoading ? "loading..." : "try it"}
                    </div>
                </button>
                <img src={ball} alt="ball" className="randomteam__decoration" />
            </div>
        </div>
    );
};

export default RandomTeam;

import ViewRandomTeam from "./ViewRandomTeam";
// import LayoutComponent from "../layoutComponent/LayoutComponent";
import "./randomTeam.scss";
import ball from "../../resources/Football-Ball-PNG.png";

const RandomTeam = ({ teams, venues }) => {
    // const randomTeamLayout = LayoutComponent({
    //     Component: ViewRandomTeam,
    //     funcName: "getRandomTeam",
    //     param: selectedCountry,
    // });
    if (!teams) return;
    const team = teams[0];
    const stadion = venues[0];
    // const { updateData, process } = randomTeamLayout.props;
    // const isLoading = process === "loading";

    return (
        <div className="randomteam">
            <ViewRandomTeam data={{ team, stadion }} />
            <article className="randomteam__static">
                <h2 className="randomteam__title">Random team for today!</h2>
                <h2 className="randomteam__title">
                    Do you want to get to know about him better?
                </h2>
                <div>
                    <article>
                        <h3 className="randomteam__title">
                            Or choose another one
                        </h3>
                        <button
                            className="button button__main"
                            // onClick={() => updateData(selectedCountry)}
                            // disabled={isLoading}
                        >
                            <div className="inner">
                                {/* {isLoading ? "loading..." : "try it"} */}
                            </div>
                        </button>
                    </article>
                    <img
                        src={ball}
                        alt="ball"
                        className="randomteam__decoration"
                    />
                </div>
            </article>
        </div>
    );
};

export default RandomTeam;

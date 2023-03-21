import "./appBanner.scss";
import footLogo from "../../resources/Football-Player.png";
import footballLogo from "../../resources/football_player_PNG128.png";

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img style={{ width: "130px" }} src={footLogo} alt="Avengers" />
            <div className="app__banner-text">
                New games every week!
                <br />
                Stay tuned!
            </div>
            <img
                style={{ width: "200px" }}
                src={footballLogo}
                alt="Football logo"
            />
        </div>
    );
};

export default AppBanner;

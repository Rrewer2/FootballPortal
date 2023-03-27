import "./appBanner.scss";
import footLogo from "../../resources/Football-Player.png";
import footballLogo from "../../resources/football_player_PNG128.png";

const AppBanner = () => (
    <div className="app-banner">
        <img className="app-banner__logo" src={footLogo} alt="logo" />
        <h2 className="app-banner__text">
            New games every week!
            <br />
            Stay tuned!
        </h2>
        <img className="app-banner__img" src={footballLogo} alt="football" />
    </div>
);

export default AppBanner;

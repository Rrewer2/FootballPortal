import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const ViewSingleGame = ({ data }) => {
    const navigate = useNavigate();
    if (!data) return;
    const { game, local, visitor, stadion, head2head } = data;

    const {
        localteam_id,
        visitorteam_id,
        winner_team_id,
        localteam_formation,
        visitorteam_formation,
        ht_score,
        ft_score,
    } = game;
    const {
        temp,
        time,
        localteam_score,
        visitorteam_score,
        localteam_position,
        visitorteam_position,
        date,
    } = game;

    const { teamName: l_name, logo_path: l_logo } = local;
    const { teamName: v_name, logo_path: v_logo } = visitor;
    const { capacity, city, name: s_name } = stadion;

    const localStyle =
        localteam_id === winner_team_id
            ? { color: "red" }
            : winner_team_id === null
            ? { color: "grey" }
            : null;
    const visitorStyle =
        visitorteam_id === winner_team_id
            ? { color: "red" }
            : winner_team_id === null
            ? { color: "grey" }
            : null;

    const Head2Head = head2head.map(
        ({
            id,
            localteam_id: localId,
            visitorteam_id: visitorId,
            winner_team_id: winner,
            ht_score,
            ft_score,
            date: gameDate,
        }) => {
            const localName =
                localteam_id === localId
                    ? data.local.teamName
                    : data.visitor.teamName;
            const visitorName =
                visitorteam_id === visitorId
                    ? data.visitor.teamName
                    : data.local.teamName;

            const color = {
                win: { color: "#a73030" },
                draw: { color: "#206330" },
                loose: { color: "#3f42e2" },
            };
            const localStyle =
                localId === winner
                    ? color.win
                    : winner === null
                    ? color.draw
                    : color.loose;
            const visitorStyle =
                visitorId === winner
                    ? color.win
                    : winner === null
                    ? color.draw
                    : color.loose;

            return (
                <p className="single-game__name" key={id}>
                    <span style={localStyle}>{localName} </span>
                    <span>{ft_score} </span>({ht_score})
                    <span style={visitorStyle}> {visitorName}</span>, {gameDate}
                </p>
            );
        }
    );

    return (
        <div className="single-game">
            <Helmet>
                <meta
                    name="description"
                    content={`${l_name} - ${v_name} game`}
                />
                <title>
                    {l_name} vs {v_name}
                </title>
            </Helmet>
            <div>
                <h2>
                    <span style={localStyle}>{l_name} </span>
                    <span>{ft_score} </span>({ht_score})
                    <span style={visitorStyle}> {v_name}</span>
                </h2>
                <img src={l_logo} alt={l_name} className="single-game__img" />
                <img src={v_logo} alt={v_name} className="single-game__img" />

                <table className="single-game__table">
                    <tr className="single-game__descr">
                        <td>{localteam_formation}</td>
                        <td>formation</td>
                        <td>{visitorteam_formation}</td>
                    </tr>
                    <tr className="single-game__descr">
                        <td>{localteam_score}</td>
                        <td>score</td>
                        <td>{visitorteam_score}</td>
                    </tr>
                    <tr className="single-game__descr">
                        <td>{localteam_position}</td>
                        <td>position</td>
                        <td>{visitorteam_position}</td>
                    </tr>
                </table>

                <div className="single-game__price">
                    {time} min, {temp}
                </div>
                <p className="single-game__descr">
                    {city}, {s_name}, {date}
                </p>
                <p className="single-game__descr">capacity: {capacity}</p>
            </div>
            <div>
                <p className="single-game__price">Last 10 games:</p>
                {Head2Head}
                <Link
                    onClick={() => navigate(-1)}
                    className="single-game__back"
                >
                    Back to all games
                </Link>
            </div>
        </div>
    );
};

export default ViewSingleGame;

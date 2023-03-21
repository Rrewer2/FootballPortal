const ViewStandings = ({ data }) => {
    const standings = data.map(
        ({
            team_name,
            points,
            position,
            round_id,
            team_id,
            recent_form: form,
            overall: {
                games_played,
                won,
                lost,
                draw,
                goals_scored,
                goals_against,
            },
        }) => {
            return (
                <tr className="standings-table-item" key={round_id + team_id}>
                    <td>{position}</td>
                    <td className="standings-table__name">{team_name}</td>
                    <td>{games_played}</td>
                    <td>{won}</td>
                    <td>{draw}</td>
                    <td>{lost}</td>
                    <td>
                        {goals_scored} - {goals_against}
                    </td>
                    <td>{points}</td>
                    <td>{form}</td>
                </tr>
            );
        }
    );
    return (
        <table className="standings-table">
            <thead>
                <tr className="standings-table__header">
                    <td>Pos</td>
                    <td>Team</td>
                    <td>Games</td>
                    <td>Won</td>
                    <td>Draw</td>
                    <td>Lost</td>
                    <td>Goals +/-</td>
                    <td>Points</td>
                    <td>Form</td>
                </tr>
            </thead>
            <tbody>{standings}</tbody>
        </table>
    );
};

export default ViewStandings;

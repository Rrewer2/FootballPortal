import ViewStandings from "./ViewStandings";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
import "./standings.scss";

const Standings = ({ standings, selectedTeams, status }) => (
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
        <tbody>
            {!standings ? null : ViewStandings(standings, selectedTeams)}
        </tbody>
    </table>
);

export default withErrorBoundary(Standings);

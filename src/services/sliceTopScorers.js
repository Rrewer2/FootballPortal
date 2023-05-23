export default function sliceTopScorers(topScorers, teamId, length = 2) {
    if (!teamId) return topScorers.map((item) => item.slice(0, length));
    return topScorers.map((item) =>
        item.filter(({ team_id }) => team_id === teamId).slice(0, length)
    );
}

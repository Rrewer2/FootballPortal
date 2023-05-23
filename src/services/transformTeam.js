export default function transformTeam({ name, ...args }) {
    return { teamName: name, ...args };
}

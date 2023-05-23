export default function returnIndex(str) {
    return ["Goal", "yellow card", "red card"]
        .map((key) => str.includes(key))
        .indexOf(true);
}

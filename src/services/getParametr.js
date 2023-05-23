export default function getParametr(obj) {
    return Object.keys(obj).filter((key) =>
        ["goals", "assists", "yellowcards", "redcards"].includes(key)
    );
}

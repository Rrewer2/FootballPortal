const getEmptyObj = (obj, par) =>
    Object.fromEntries(
        Object.entries(obj).map((el) =>
            el.map((item, i) => (!i || el[i - 1] === "id" ? item : par))
        )
    );

export default function findElemById(arr, Id) {
    if (!arr[0])
        return {
            id: Id,
            display_name: Id,
            image_path:
                "https://cdn.sportmonks.com/images/soccer/players/8/172104.png",
        };
    const elem = arr.find(({ id }) => id === Id);
    if (!elem) {
        const player = arr.find(({ player_id }) => player_id === Id);
        if (!player) return getEmptyObj(arr[0], Id);
        return player;
    }
    return elem;
}

export const extractData = ({ data }) => data;

export const getClassName = (id, winnerId, baseClass) =>
    id === winnerId
        ? `${baseClass}-winner`
        : winnerId === null
        ? `${baseClass}-draw`
        : `${baseClass}-loose`;

const newDate = (y, m, d) => {
    const date = y ? new Date(y, m, d) : new Date();
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};

const dateToString = (a, b, c, d, e, f) => `${a}-${b}-${c}/${d}-${e}-${f}`;

export function* getPeriod(period) {
    const [Y, MM, DD] = newDate();
    let [nextY, nextMM, nextDD] = [Y, MM, DD];
    const getPrev = (y, m, d) => newDate(y, +m - 1 - period, d + 1);
    let [prevY, prevMM, prevDD] = getPrev(nextY, nextMM, nextDD);
    yield dateToString(prevY, prevMM, prevDD, nextY, nextMM, nextDD);

    while (prevY > 2005) {
        [nextY, nextMM, nextDD] = newDate(prevY, +prevMM - 1, prevDD - 1);
        [prevY, prevMM, prevDD] = getPrev(nextY, nextMM, nextDD);
        yield dateToString(prevY, prevMM, prevDD, nextY, nextMM, nextDD);
    }
}
export const newGenerator = (a) => getPeriod(a);
const getEmptyObj = (obj, par) =>
    Object.fromEntries(
        Object.entries(obj).map((el) =>
            el.map((item, i) => (!i || el[i - 1] === "id" ? item : par))
        )
    );
export const findElemById = (arr, Id) => {
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
        // console.log(`${Id} isn't finded`);
        // return arr[arr.length - 1];
        if (!player) return getEmptyObj(arr[0], Id);
        return player;
    }
    return elem;
};
const uniqueArr = (arr) =>
    [...new Set(arr.map((o) => JSON.stringify(o)))].map((str) =>
        JSON.parse(str)
    );

const isNewSeason = (str1, str2) => {
    if (!str1 || !str2) return !1;
    const date1 = +str1.slice(5, 7);
    const date2 = +str2.slice(5, 7);
    return date1 - date2 > 1;
};

export const separateArray = (arr) => {
    const res = [[]];
    let count = 0;
    uniqueArr(arr).forEach(({ date }, i, A) => {
        res[count].push(A[i]);
        if (!isNewSeason(date, A[i + 1]?.date)) return;
        count += 1;
        res.push([]);
    });
    return res;
};

export const getYear = (arr) => arr[0].date.slice(0, 4);

export const sliceTopscorers = (topScorers, teamId, length = 2) => {
    if (!teamId) return topScorers.map((item) => item.slice(0, length));
    return topScorers.map((item) =>
        item.filter(({ team_id }) => team_id === teamId).slice(0, length)
    );
};

export const getTopScorers = (slicedScorers, teams, allPlayers) => {
    return slicedScorers.map((el) =>
        el.map(({ player_id, team_id, ...args }) => ({
            ...args,
            ...narrowObj(
                findElemById(allPlayers, player_id),
                "display_name",
                "image_path"
            ),
            teamName: findElemById(teams, team_id).teamName,
            player_id,
        }))
    );
};

export const narrowObj = (obj, ...args) =>
    Object.fromEntries(
        args.map((arg) => [
            arg,
            obj[Object.keys(obj).find((key) => arg.includes(key))],
        ])
    );

export const getParametr = (obj) =>
    Object.keys(obj).filter((key) =>
        ["goals", "assists", "yellowcards", "redcards"].includes(key)
    );

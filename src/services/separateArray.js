const uniqueArr = (arr) =>
    [...new Set(arr.map((o) => JSON.stringify(o)))].map((str) =>
        JSON.parse(str)
    );

const isNewSeason = (str1, str2) => {
    if (!str1 || !str2) return false;
    const date1 = +str1.slice(5, 7);
    const date2 = +str2.slice(5, 7);
    return date1 - date2 > 1;
};

export default function separateArray(arr) {
    const res = [[]];
    let count = 0;
    uniqueArr(arr).forEach(({ date }, i, A) => {
        res[count].push(A[i]);
        if (!isNewSeason(date, A[i + 1]?.date)) return;
        count += 1;
        res.push([]);
    });
    return res;
}

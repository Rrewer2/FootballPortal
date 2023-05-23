const newDate = (y, m, d) => {
    const date = y ? new Date(y, m, d) : new Date();
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};

const dateToString = (a, b, c, d, e, f) => `${a}-${b}-${c}/${d}-${e}-${f}`;

export default function* newGenerator(period) {
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

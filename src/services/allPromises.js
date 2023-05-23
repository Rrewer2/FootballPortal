export default async function allPromises(arrPromises) {
    return (await Promise.allSettled(arrPromises)).map(({ value }) => value);
}

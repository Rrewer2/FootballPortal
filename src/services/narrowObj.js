export default function narrowObj(obj, ...args) {
    return Object.fromEntries(
        args.map((arg) => [
            arg,
            obj[Object.keys(obj).find((key) => arg.includes(key))],
        ])
    );
}

export default function getClassName(id, winnerId, baseClass) {
    return id === winnerId
        ? `${baseClass}-winner`
        : winnerId === null
        ? `${baseClass}-draw`
        : `${baseClass}-loose`;
}

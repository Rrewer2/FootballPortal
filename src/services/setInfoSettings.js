import separateArray from "./separateArray";

export default function setInfoSettings(info, res) {
    return !info
        ? { ...res, games: separateArray(res.games) }
        : {
              ...info,
              games: separateArray([...info.games.flat(), ...res.games]),
          };
}

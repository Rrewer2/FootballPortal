import { useRef, useState, useEffect } from "react";
import useFootballService from "./useFootballService";

export default function useMyEffect(key, depend, dataObj, setGame = () => {}) {
    const [data, setData] = useState({});
    const obj = useFootballService();
    const ref = useRef(null);

    const setAllInfo = (res) => {
        setData(res);
        setGame(res);
    };

    useEffect(() => {
        if (depend && ref.current !== depend) {
            ref.current = depend;
            (async () => setAllInfo(await obj[key](depend, dataObj)))();
        }
        return () => setGame(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depend]);

    return [data, obj.status];
}

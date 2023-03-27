import { useState, useEffect } from "react";
import useFootballService from "./FootballService";
// import Spinner from "../components/spinner/Spinner";
// import ErrorMessage from "../components/errorMessage/ErrorMessage";

const LayoutComponent = ({ funcName, param }) => {
    console.log(funcName, param);
    const [data, setData] = useState(null);

    const obj = useFootballService();
    const { cleanError, process, setProcess } = obj;

    const updateData = (param) => {
        if (!param) return;
        if (Array.isArray(param) && param.every((el) => !el)) return;
        cleanError();
        obj[funcName](param)
            .then((data) => {
                setData(data);
                setProcess("render");
            })
            .catch((e) => {
                setProcess("error");
                console.log(e);
            });
    };

    useEffect(() => updateData(param), [param]);

    const layout = (process) => {
        const content = {
            render: () => ({ ...data, updateData, process }),
            // loading: () => <Spinner process={process} />,
            // error: () => <ErrorMessage updateData={updateData} />,
            loading: () => ({ process }),
            error: () => ({ process, updateData }),
            default: () => {
                throw new Error("Unexpected process state");
            },
        };
        if (!content[process]) {
            return content["default"]();
        } else {
            return content[process]();
        }
    };
    return layout(process);
};

export default LayoutComponent;

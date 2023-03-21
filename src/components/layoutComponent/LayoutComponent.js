import { useState, useEffect } from "react";
import useFootballService from "../../services/FootballService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const LayoutComponent = ({ Component, funcName, param, ...args }) => {
    const [data, setData] = useState(null);

    const obj = useFootballService();
    const { cleanError, process, setProcess } = obj;

    const updateData = (param) => {
        if (!param) return;
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
            render: () => (
                <Component
                    data={data}
                    updateData={updateData}
                    process={process}
                    args={args}
                />
            ),
            loading: () => <Spinner process={process} />,
            error: () => <ErrorMessage />,
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

import { Component } from "react";
import { FootballService } from "./footballService";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

class LayoutComponent extends Component {
    constructor(props) {
        super(props);
        this.Component = props.Component;
        this.funcName = props.funcName;
        this.param = props.param;
        this.args = props.args;
        this.state = { data: null };
        const obj = FootballService();
        this.cleanError = obj.cleanError;
        this.process = obj.cleanError;
        this.setProcess = obj.setProcess;
    }

    updateData(param) {
        if (!param) return;
        if (Array.isArray(param) && param.every((el) => !el)) return;
        this.cleanError();
        this.obj[this.funcName](param)
            .then((newData) => {
                this.setState({ data: newData });
                this.setProcess("render");
            })
            .catch((e) => {
                this.setProcess("error");
                console.log(e);
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.param !== this.param) {
            this.updateData(this.param);
        }
    }

    layout(process) {
        const content = {
            render: () => (
                <this.Component
                    data={{
                        ...this.state.data,
                        ...this.args,
                        process: this.process,
                        updateData: this.updateData,
                    }}
                />
            ),
            loading: () => <Spinner process={this.process} />,
            error: () => <ErrorMessage updateData={this.updateData} />,
            default: () => {
                throw new Error("Unexpected process state");
            },
        };
        if (!content[process]) {
            return content["default"]();
        } else {
            return content[process]();
        }
    }
    render() {
        this.layout(this.process);
    }
}

export default LayoutComponent;

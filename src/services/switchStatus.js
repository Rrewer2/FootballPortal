import Spinner from "../components/spinner/Spinner";

export default function WithLoading(status, Child) {
    return (props) =>
        status === "loading" ? <Spinner /> : <Child {...props} />;
}

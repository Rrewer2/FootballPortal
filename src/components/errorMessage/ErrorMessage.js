import img from "./error.gif";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";

const ErrorMessage = () => (
    <img className="error-message" src={img} alt="Error" />
);

export default withErrorBoundary(ErrorMessage);

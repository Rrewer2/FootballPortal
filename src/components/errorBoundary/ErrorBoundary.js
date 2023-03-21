import { useState, useEffect } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ErrorBoundary = ({ children }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        const errorHandler = (error) => {
            console.log(error);
            setError(true);
        };
        window.addEventListener("error", errorHandler);
        return () => {
            window.removeEventListener("error", errorHandler);
        };
    }, []);

    if (error) {
        return <ErrorMessage />;
    }

    return children;
};

export default ErrorBoundary;

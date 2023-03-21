import img from "./error.gif";

const ErrorMessage = () => {
    return (
        <img
            style={{
                margin: "0 auto",
                background: "none",
                display: "block",
                width: "250px",
                height: "250px",
                objectFit: "contain",
            }}
            src={img}
            alt="Error"
        />
    );
};

export default ErrorMessage;

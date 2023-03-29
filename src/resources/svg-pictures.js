import ballSrc from "./soccer-ball.png";
export const ball = <img className="comments__img" src={ballSrc} alt="goal" />;

export const yellowcards = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ display: "table-cell" }}
    >
        <rect
            x="8"
            y="0"
            width="12"
            height="18"
            rx="2"
            fill="#FFD700"
            transform="rotate(10)"
        />
    </svg>
);

export const redcards = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ display: "table-cell" }}
    >
        <rect
            x="8"
            y="0"
            width="12"
            height="18"
            rx="2"
            fill="#ff5500"
            transform="rotate(10)"
        />
    </svg>
);

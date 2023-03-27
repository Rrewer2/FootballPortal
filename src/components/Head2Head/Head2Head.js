import LayoutComponent from "../layoutComponent/LayoutComponent";
import ViewHead2Head from "./ViewHead2Head";

const Head2Head = ({ gameId, onGameSelected, onIdsFinded }) =>
    LayoutComponent({
        Component: ViewHead2Head,
        funcName: "getHead2Head",
        param: gameId,
        onGameSelected: onGameSelected,
        onIdsFinded: onIdsFinded,
    });

export default Head2Head;

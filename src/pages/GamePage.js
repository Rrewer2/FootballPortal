import { useParams } from "react-router-dom";
import useMyEffect from "../hooks/useMyEffect";
import Head2Head from "../components/Head2Head/Head2Head";
import GameInfo from "../components/GameInfo/GameInfo";
import Comments from "../components/Comments/Comments";

export default function GamePage({ setGame }) {
    const { gameId } = useParams();
    const [info, status] = useMyEffect("gamePageInfo", gameId, null, setGame);

    return (
        <div className="main">
            <section className="section-wrapper grid-2col">
                <GameInfo data={info} />
                <Head2Head data={info} />
            </section>

            <section className="section-wrapper">
                <Comments data={info?.comments} />
            </section>
        </div>
    );
}

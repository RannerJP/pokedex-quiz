import { useParams } from "react-router-dom";

function WinScreen() {
    const { totalScore } = useParams();


    return (
        <>
            {totalScore && (
                <div> Your score was {totalScore} congrats!</div>)}
        </>
    );
}

export default WinScreen;

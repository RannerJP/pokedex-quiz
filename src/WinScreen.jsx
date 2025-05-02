import { useParams, Link } from "react-router-dom";
import "./WinScreen.css";


function WinScreen() {
    const { totalScore } = useParams();


    return (
        <div className="WinScreen">
            {totalScore && (
                <p> Your total score is <strong>{totalScore}</strong> congratulations!</p>)}
                <Link to="/pokedex-quiz" className='linkButton'>Return to Homepage</Link>
        </div>
    );
}

export default WinScreen;

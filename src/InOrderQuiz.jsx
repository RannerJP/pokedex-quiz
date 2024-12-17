import { useEffect, useState, useRef } from 'react';
import pokedex from "./data/pokemon.json";
import "./InOrderQuiz.css"

function InOrderQuiz() {
  const [pokedexNumbers, setPokedexNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [guessingPoints, setGuessingPoints] = useState(10);
  const [hintPoints, setHintPoints] = useState(10);
  const [nameHintedUsed, setNameHintUsed] = useState(false);

  // const randomNumber = (size) => {
  //   return Math.floor(Math.random() * (size - 1 + 1)) + 1;
  // }

  useEffect(() => {
    const itemsArray = pokedex;
    setPokedexNumbers(itemsArray);
  }, [pokedexNumbers]);

  const showNameHint = () =>{
    if(!nameHintedUsed){
      setNameHintUsed(true);
      setHintPoints((prev) => (prev - 5));
    }

  }

  const checkAnswer = (e) =>{
    e.preventDefault();
    if(userAnswer.toLowerCase() === pokedexNumbers[currentIndex-1].toLowerCase()){
      setTotalPoints((prev) => (prev + guessingPoints + hintPoints));
      setCurrentIndex((prev) => (prev + 1));
      setGuessingPoints(10);
      setHintPoints(10);
      setUserAnswer("");
      setNameHintUsed(false);
    }
    else{
      if(guessingPoints != 0){
        setGuessingPoints((prev) => (prev - 1));
      }
    }
  }

  return (
    <>
      {pokedexNumbers.length > 0 ? (
        <>
          <h1>Quiz Page</h1>
          <h2>Total Points: {totalPoints}</h2>
          <div className='points'>
            <h2>Hint Points: {hintPoints}</h2>
            <h2>Guess Points: {guessingPoints}</h2>
          </div>
          <h2>Who is #{currentIndex}</h2>
          <h3>
            {nameHintedUsed && (
              <p>
                {pokedexNumbers[currentIndex - 1][0]}***
                {pokedexNumbers[currentIndex - 1].slice(-1)}
              </p>
            )}
          </h3>
          <form onSubmit={checkAnswer}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={showNameHint}>Name Hint</button>
        </>
      ) : (
        <h1>Loading...</h1> // Fallback content if `pokedexNumbers` is empty
      )}
    </>
  );
}

export default InOrderQuiz

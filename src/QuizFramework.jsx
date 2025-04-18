import { useState, useEffect, useRef} from 'react';
import "./QuizFramework.css";
import pokedex from "./data/pokemon.json";


function QuizFramework({updateIndex}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [guessingPoints, setGuessingPoints] = useState(10);
  const [hintPoints, setHintPoints] = useState(10);
  const [nameHintedUsed, setNameHintUsed] = useState(false);
  const [pokedexNumbers, setPokedexNumbers] = useState(null);

  useEffect(() => {
    if(!pokedexNumbers){
      const itemsArray = pokedex;
      const pokemonMap = itemsArray.reduce((acc, pokemon, index) => {
        acc[index] = pokemon;
        return acc;
      }, {});
      setPokedexNumbers(pokemonMap);
    }
  }, [[pokedexNumbers]]);

  useEffect(() => {
    if(currentIndex === 0 && pokedexNumbers){
      const start = updateIndex(Object.keys(pokedexNumbers).length);
      setCurrentIndex(start);
    }
  }, [[currentIndex]]);

  const loadNextPokemon = () => {
    const newPokedexNumbers = {...pokedexNumbers};
    delete newPokedexNumbers[currentIndex-1];
    setPokedexNumbers(newPokedexNumbers);
    const index = updateIndex(Object.keys(pokedexNumbers).length - 1);
    setCurrentIndex(index);
  }

  const showNameHint = () =>{
    if(!nameHintedUsed){
      setNameHintUsed(true);
      setHintPoints((prev) => (prev - 5));
    }

  }

  const normalizeName = (name) => {
    name = name.toLowerCase();
    name = name.normalize("NFD");
    name = name.replace(/[^0-9a-z]/gi, '');
    return name;
  }

  const updatePoints = () => {
    setTotalPoints((prev) => (prev + guessingPoints + hintPoints));
    setGuessingPoints(10);
    setHintPoints(10);
    setUserAnswer("");
    setNameHintUsed(false);
  }

  const checkAnswer = (e) =>{
    e.preventDefault();
    if(normalizeName(userAnswer).includes(normalizeName(pokedexNumbers[currentIndex-1]))){
      updatePoints();
      loadNextPokemon();
    }
    else{
      if(guessingPoints != 0){
        setGuessingPoints((prev) => (prev - 1));
      }
    }
  }

  return (
    <>
      {pokedexNumbers && currentIndex !== 0 ? (
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
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default QuizFramework;

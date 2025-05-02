import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./QuizFramework.css";
import pokedex from "./data/pokemon.json";


function QuizFramework({updatePokemon}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [pokedexNumber, setPokedexNumber] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [guessingPoints, setGuessingPoints] = useState(10);
  const [hintPoints, setHintPoints] = useState(5);
  const [nameHintedUsed, setNameHintUsed] = useState(false);
  const [unguessedPokemon, setUnguessedPokemon] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if(!unguessedPokemon){
      const itemsArray = pokedex;
      const pokemonMap = itemsArray.reduce((acc, pokemon, index) => {
        acc[index+1] = pokemon;
        return acc;
      }, {});
      setUnguessedPokemon(pokemonMap);
    }
  }, [[unguessedPokemon]]);

  useEffect(() => {
    if(pokedexNumber === 0 && unguessedPokemon){
      const start = updatePokemon(Object.keys(unguessedPokemon).length);
      setPokedexNumber(parseInt(Object.keys(unguessedPokemon)[start-1]));
    }
  }, [[pokedexNumber, unguessedPokemon]]);

  const pokedexCompleted = () =>{
    return Object.keys(unguessedPokemon).length === 1 ? true : false;
  }

  const updateTotalPoints = () =>{
    const newPoints = totalPoints + guessingPoints + hintPoints;
    setTotalPoints(newPoints);
    return newPoints;
  }

  const loadNextPokemon = () => {
    const newPoints = updateTotalPoints();
    if(pokedexCompleted()){
      navigate(`/pokedex-quiz/win/${newPoints}`, { replace: true });
    }
    const newUnguessedPokemon = {...unguessedPokemon};
    delete newUnguessedPokemon[pokedexNumber];
    setUnguessedPokemon(newUnguessedPokemon);
    const index = updatePokemon(Object.keys(unguessedPokemon).length);
    setPokedexNumber(parseInt(Object.keys(newUnguessedPokemon)[index-1]));
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
    setGuessingPoints(10);
    setHintPoints(10);
    setUserAnswer("");
    setNameHintUsed(false);
  }

  const checkAnswer = (e) =>{
    e.preventDefault();
    if(normalizeName(userAnswer).includes(normalizeName(unguessedPokemon[pokedexNumber]))){
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
      {unguessedPokemon && pokedexNumber !== 0 ?  (
        <div className="quizFramework">
          <h1>Pokedex Quiz</h1>
          <img src="src/assets/whos-that-pokemon.avif" alt="Who's that pokemon screencap with no pokemon silhouette" />
          <h2>Total Points: {totalPoints}</h2>
          <div className='points'>
            <p>Hint Points: {hintPoints}</p>
            <p>Guess Points: {guessingPoints}</p>
          </div>
          <p>Which Pokemon is <strong>#{pokedexNumber}</strong></p>
          <form onSubmit={checkAnswer}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={showNameHint}>Name Hint</button>
          {nameHintedUsed && (
              <p>
                {unguessedPokemon[pokedexNumber][0]}...
                {unguessedPokemon[pokedexNumber].slice(-1)}
              </p>
            )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default QuizFramework;

import { useEffect, useState, useRef } from 'react';
import QuizFramework from "./QuizFramework.jsx";


function RandomOrderQuiz() {

  const updatePokemon = (unguessedPokemon) =>{
    const newIndex = Math.floor(Math.random() * unguessedPokemon);
    return newIndex + 1;
  }

  return (
    <>
      <QuizFramework
        updatePokemon={updatePokemon}
      >
      </QuizFramework>
    </>
  );
}

export default RandomOrderQuiz;

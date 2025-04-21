import { useEffect, useState, useRef } from 'react';
import QuizFramework from "./QuizFramework.jsx";


function InOrderQuiz() {  

  const updatePokemon = (currentIndex) =>{
    return 1;
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

export default InOrderQuiz

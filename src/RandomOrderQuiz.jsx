import { useEffect, useState, useRef } from 'react';
import QuizFramework from "./QuizFramework.jsx";


function RandomOrderQuiz() {

  const updateIndex = (currentIndex) =>{
    const newIndex = Math.floor(Math.random() * currentIndex);
    return newIndex + 1;
  }

  return (
    <>
      <QuizFramework
        updateIndex={updateIndex}
      >
      </QuizFramework>
    </>
  );
}

export default RandomOrderQuiz;

import { useEffect, useState, useRef } from 'react';
import QuizFramework from "./QuizFramework.jsx";


function InOrderQuiz() {  

  const updateIndex = (currentIndex) =>{
    console.log(currentIndex);
    return 1025 - currentIndex + 1;
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

export default InOrderQuiz

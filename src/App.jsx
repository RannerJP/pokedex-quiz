import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './Home';
import InOrderQuiz from './InOrderQuiz';
import RandomOrderQuiz from './RandomOrderQuiz';

function App() {
  return (
    <>
      <Routes>
        <Route path="/pokedex-quiz" element={<Home />} />
        <Route path="/pokedex-quiz/In-Order-Quiz" element={<InOrderQuiz />} />
        <Route path="/pokedex-quiz/Random-Order-Quiz" element={<RandomOrderQuiz />} />
      </Routes>
    </>
  );
}
export default App;

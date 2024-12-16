import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './Home';
import InOrderQuiz from './InOrderQuiz';

function App() {
  return (
    <>
      <Routes>
        <Route path="/pokedex-quiz" element={<Home />} />
        <Route path="/pokedex-quiz/In-Order-Quiz" element={<InOrderQuiz />} />
      </Routes>
    </>
  );
}
export default App;

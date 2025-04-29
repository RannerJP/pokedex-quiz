import { useState } from 'react'
import { Link } from 'react-router-dom';

import './Home.css'

function Home() {
  return (
    <div className='homepage'>
      <h1>Pokémon Quizzes</h1>
      <div className='buttons'>
        <Link to="/pokedex-quiz/In-Order-Quiz" className='linkButton'>Pokédex In Order</Link>
        <Link to="/pokedex-quiz/Random-Order-Quiz" className='linkButton'>Pokédex Random Order</Link>
      </div>
      
    </div>
  )
}

export default Home

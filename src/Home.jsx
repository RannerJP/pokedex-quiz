import { useState } from 'react'
import { Link } from 'react-router-dom';

import './Home.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Pokémon Quiz</h1>
      <button><Link to="/pokedex-quiz/In-Order-Quiz">Pokédex Order</Link></button>
      <button><Link to="/pokedex-quiz/In-Order-Quiz">Pokédex Order</Link></button>
    </>
  )
}

export default Home

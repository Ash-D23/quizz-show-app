import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizResultCard.css'

function QuizResultCard({ game: { id, name, score} }) {

  const navigate = useNavigate()

  return (
    <div onClick={()=> navigate('/quizgame/'+id)} className='container__flex--spacebetween result-game--container padding--large'>
        <p>{name}</p>
        <p>{score}</p>
    </div>
  )
}

export { QuizResultCard }
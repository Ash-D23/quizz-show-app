import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GamesType } from '../../types/AllQuiz.types'
import './SingleQuiz.css'

function SingleQuiz({ game, result } : { game: GamesType, result: Boolean | null }) {

  const navigate = useNavigate()
  
  return (
    <div onClick={()=> navigate('/quizgame/'+game?.id)} className="card quiz--card margin--medium">
        <div className="card__image--container container--relative">
          <img className="card__image" src={game?.img} alt="single quiz" />
        </div>
        <div className="card__body background--light padding--medium">
            
            <div className="container__flex--spacebetween">
                <h2 className="card__title text--large">{game?.name}</h2>
                <Link to={"/quizgame/"+game?.id}>
                  <button className="btn btn--red">
                    {result ? 'Play Again' : 'Play Now'}
                  </button></Link>
            </div>

        </div> 
    </div> 
  )
}

export { SingleQuiz }
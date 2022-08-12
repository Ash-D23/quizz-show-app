import React, { useEffect } from 'react';
import { useQuizGameContext } from '../../Context';
import QuizQuestion from '../QuizQuestion/QuizQuestion';
import QuizResults from '../QuizResults/QuizResults';
import { db } from '../../firebase';
import QuizRules from '../QuizRules/QuizRules';
import { Loader } from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

function QuizGame({ gameid } : { gameid: string | undefined}) : JSX.Element {

  const quiz = useQuizGameContext()

  const gameState = quiz?.quizGameState.gameState
  const quizGameDispatch = quiz?.quizGameDispatch
  const startTimer = quiz?.timerObj.startTimer

  const navigate = useNavigate();

  const loadGame = async () => {
      try{
        const singleGame = db.ref('/Games/'+gameid);
        const snapshot = await singleGame.once('value');
        const value = snapshot.val();
        if(!value){
          navigate('/notfound')
        }

        if(quizGameDispatch){
          quizGameDispatch({ type: "setQuizData", payload: value})
        }
        
      }catch(err){
        console.error(err)
      }
  }

  const startGame = () => {
    if(quizGameDispatch){
      quizGameDispatch({ type: "gameState", payload: {gameState: "game"}})
    }
    
    startTimer()
  }

  useEffect(()=>{
    loadGame()
  }, [])

  switch(gameState){
    case 'loading':
      return <Loader />
    case 'rules':
        return <QuizRules start={startGame} />
    case 'results':
      return <QuizResults />
    case 'game':
      return <QuizQuestion />
    default:
      return <Loader />
  }
}

export { QuizGame }
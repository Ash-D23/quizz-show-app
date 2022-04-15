import React, { useEffect } from 'react';
import { useQuizGameContext } from '../../Context';
import QuizQuestion from '../QuizQuestion/QuizQuestion';
import QuizResults from '../QuizResults/QuizResults';
import { db } from '../../firebase';
import QuizRules from '../QuizRules/QuizRules';
import { QuizGameActions } from '../../Utilities';
import { Loader } from '../Loader/Loader';

function QuizGame({ gameid }) {

  const { quizGameState: { gameState }, quizGameDispatch, timerobj: {startTimer} } = useQuizGameContext()

  const loadGame = async () => {
      try{
        const categories = db.ref('/Games/'+gameid);
        const snapshot = await categories.once('value');
        const value = snapshot.val();
        quizGameDispatch({ type: QuizGameActions.SET_QUIZ_DATA, payload: value})
      }catch(err){
        console.error(err)
      }
  }

  const startGame = () => {
    quizGameDispatch({ type: QuizGameActions.GAME_STATE, payload: {gameState: "game"}})
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
  }
}

export { QuizGame }
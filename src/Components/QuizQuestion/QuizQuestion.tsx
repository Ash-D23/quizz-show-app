import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizGameContext, useTheme } from '../../Context'
import { toastsuccess } from '../../Utilities'
import './QuizQuestion.css'

function QuizQuestion() {

  const quiz = useQuizGameContext()
  const name = quiz?.quizGameState.name
  const currentQuestion = quiz?.quizGameState.currentQuestion || 0
  const questions = quiz?.quizGameState.questions
  const currentSelectedOption = quiz?.quizGameState.currentSelectedOption

  const submitAnswer = quiz?.quizGameMethods.submitAnswer
  const selectAnswer = quiz?.quizGameMethods.selectAnswer

  const time = quiz?.timerObj.time
  const resetTimer = quiz?.timerObj.resetTimer

  const ThemeValue  = useTheme()
  const Theme = ThemeValue?.Theme
  const navigate = useNavigate()

  const totalQuestions = questions?.length
  const question = questions.length ? questions[currentQuestion]?.name : null
  const options =  questions.length ? questions[currentQuestion]?.options : []

  const handleQuit = () => {
      resetTimer()
      navigate("/explore")
      toastsuccess("Left the Game")
  }

  return (
    <div className={`container__flex--center question ${ Theme === 'light' ? 'light__container' : ''}`}>
        <div className={`question__container border--grey padding--medium ${ Theme === 'light' ? 'light__content' : ''}`}>
            <h2 className="text--center margin--medium question--heading"> {name} </h2>
            
            <div className="container__flex--spacebetween question__score">
                <p className='text--bold'>Question {currentQuestion+1}/{totalQuestions}</p>
                <p className='text--bold'>Time Remaining : {time}</p>
            </div>

            <div className="margin--medium">
                <p>{question}</p>
            </div>

            <div className="container__answer margin--medium">
                {options?.map((item : string, index : number)=>{
                    return (
                    <div key={index} onClick={()=> selectAnswer(index)} className={`answer ${currentSelectedOption===index ? `answer--selected` : 'answer--plain'}`}>
                        <p>{item}</p>
                    </div> )
                })}
            </div>

            <div className="container__flex--center margin--medium">
                <button onClick={submitAnswer} className="btn btn--light">
                    { currentQuestion+1 === totalQuestions ? 'Finish' : 'Next'}
                </button>
                <button onClick={handleQuit} className="btn btn--red margin-left--medium">
                    Quit
                </button>
            </div>

        </div>
    </div>
  )
}

export default QuizQuestion
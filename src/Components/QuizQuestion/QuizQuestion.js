import React from 'react'
import { useQuizGameContext, useTheme } from '../../Context'
import './QuizQuestion.css'

function QuizQuestion() {

  const { quizgamestate: {name, currentquestion, questions, currentselectedoption}, 
    quizgamemethods: {submitanswer, selectanswer}, 
  timerobj: {time}} = useQuizGameContext()

  const { Theme } = useTheme()

  const totalquestions = questions.length
  const question = questions.length ? questions[currentquestion]?.name : null
  const options =  questions.length ? questions[currentquestion]?.options : []

  return (
    <div class={`container__flex--center question padding--large ${ Theme === 'light' ? 'light__container' : ''}`}>
        <div class={`question__container border--grey padding--medium ${ Theme === 'light' ? 'light__content' : ''}`}>
            <h2 class="text--center margin--medium question--heading"> {name} </h2>
            
            <div class="container__flex--spacebetween question__score">
                <p className='text--bold'>Question {currentquestion+1}/{totalquestions}</p>
                <p className='text--bold'>Time Remaining : {time}</p>
            </div>

            <div class="margin--medium">
                <p>{question}</p>
            </div>

            <div class="container__answer margin--medium">
                {options?.map((item, index)=>{
                    return (
                    <div onClick={()=> selectanswer(index)} className={`answer ${currentselectedoption===index ? `answer--selected` : 'answer--plain'}`}>
                        <p>{item}</p>
                    </div> )
                })}
            </div>

            <div class="container__flex--center margin--medium">
                <button onClick={submitanswer} class="btn btn--light">
                    { currentquestion+1 === totalquestions ? 'Finish' : 'Next'}
                </button>
            </div>

        </div>
    </div>
  )
}

export default QuizQuestion
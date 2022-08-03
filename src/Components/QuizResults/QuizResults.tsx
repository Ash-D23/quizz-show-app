import React from 'react';
import { useQuizGameContext, useTheme } from '../../Context';
import { questionsType } from '../../types/AllQuiz.types';
import ResultAnswer from '../ResultAnswer/ResultAnswer';
import './QuizResults.css';

function QuizResults() {

    const { quizGameState: { id, name, questions, answers, selectedAnswers, score } } : any = useQuizGameContext()

    const totalquestions = questions.length

    const ThemeValue  = useTheme()
    const Theme = ThemeValue?.Theme

  return (
    <div className={`container__flex--center padding--large ${ Theme === 'light' ? 'light__container' : ''}`}>
        <div className="container__results">
            
            <div className="results margin--medium">
                <h2 className="text--center margin--medium">Result</h2>
                <p className="text--center margin--medium">Final Score: {score}/100</p>
                { score >= 50 ? <p className="text--center margin--medium result">Congratulations !!! You Passed</p> :
                    <p className="text--center margin--medium result">Better Luck next Time!</p> }
                <div className='results--actions'>
                    <a href={`https://twitter.com/share?url=http://localhost:3000/quizgame/${id}&text=Hey Everyone I just scored ${score} points on this Quiz - ${name}. Challenge my score by playing: `} target="_blank"><button className='btn btn--share'>Share <i className="fab fa-twitter"></i></button></a>
                </div>
            </div>

            <div className="result--answers margin-tb--medium">
                <h3 className="text--center margin--large">View Your Answers</h3>

                {questions?.map((item : questionsType, index : number)=>{
                    return (
                        <ResultAnswer key={index} totalquestions={totalquestions} questionnumber={index} question={item.name} quizoptions={item.options} answer={answers[index]} selectedanswer={selectedAnswers[index]} />
                    )
                })}
            </div>
 
        </div>
    </div>
  )
}

export default QuizResults
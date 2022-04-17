import React from 'react';
import { useQuizGameContext, useTheme } from '../../Context';
import ResultAnswer from '../ResultAnswer/ResultAnswer';
import './QuizResults.css';

function QuizResults() {

    const { quizGameState: { questions, answers, selectedAnswers, score } } = useQuizGameContext()

    const totalquestions = questions.length

    const { Theme } = useTheme()

  return (
    <div className={`container__flex--center padding--large ${ Theme === 'light' ? 'light__container' : ''}`}>
        <div className="container__results">
            
            <div className="results margin--medium">
                <h2 className="text--center margin--medium">Result</h2>
                <p className="text--center margin--medium">Final Score: {score}/100</p>
                { score >= 50 ? <p className="text--center margin--medium result">Congratulations !!! You Passed</p> :
                    <p className="text--center margin--medium result">Better Luck next Time!</p> }
            </div>

            <div className="result--answers margin-tb--medium">
                <h3 className="text--center margin--large">View Your Answers</h3>

                {questions?.map((item, index)=>{
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
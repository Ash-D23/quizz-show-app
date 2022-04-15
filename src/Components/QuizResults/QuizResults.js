import React from 'react';
import { useQuizGameContext, useTheme } from '../../Context';
import ResultAnswer from '../ResultAnswer/ResultAnswer';
import './QuizResults.css';

function QuizResults() {

    const { quizgamestate: { questions, answers, selectedanswers, score } } = useQuizGameContext()

    const totalquestions = questions.length

    const { Theme } = useTheme()

  return (
    <div class={`container__flex--center padding--large ${ Theme === 'light' ? 'light__container' : ''}`}>
        <div class="container__results">
            
            <div class="results margin--medium">
                <h2 class="text--center margin--medium">Result</h2>
                <p class="text--center margin--medium">Final Score: {score}/100</p>
                { score >= 50 ? <p class="text--center margin--medium result">Congratulations !!! You Passed</p> :
                    <p class="text--center margin--medium result">Better Luck next Time!</p> }
            </div>

            <div class="result--answers margin-tb--medium">
                <h3 class="text--center margin--large">View Your Answers</h3>

                {questions?.map((item, index)=>{
                    return (
                        <ResultAnswer totalquestions={totalquestions} questionnumber={index} question={item.name} quizoptions={item.options} answer={answers[index]} selectedanswer={selectedanswers[index]} />
                    )
                })}
            </div>
 
        </div>
    </div>
  )
}

export default QuizResults
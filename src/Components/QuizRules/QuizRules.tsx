import React from 'react';
import { useTheme } from '../../Context';
import './QuizRules.css';

function QuizRules({ start } : any) {

  const { Theme } : any = useTheme()

  return (
    <div className={`container__flex--center rules ${ Theme === 'light' ? 'light__container' : ''}`}>
        <div className={`rules__container border--grey padding--medium ${ Theme === 'light' ? 'light__content' : ''}`}>
            <h2 className="text--center margin-tb--large"> Rules </h2>

            <ul className="styled-list styled-list--stacked margin--medium">
                <li>1) Lorem ipsum dolor sit amet consectetur, adipisicing elit. </li>
                <li>2) Hic libero culpa numquam, quidem, sequi similique deserunt laudantium eligendi rerum fugiat neque fugit obcaecati voluptate tempore harum quas inventore quam asperiores.</li>
                <li>3) Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
            </ul>

            <div className="container__flex--center margin--medium">
                <button onClick={() => start()} className="btn btn--light">Accept</button>
            </div>
        </div>
    </div>
  )
}

export default QuizRules
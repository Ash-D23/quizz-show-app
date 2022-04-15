import React from 'react';
import { useTheme } from '../../Context';
import './QuizRules.css';

function QuizRules({ start }) {

  const { Theme } = useTheme()

  return (
    <div class={`container__flex--center rules padding--large ${ Theme === 'light' ? 'light__container' : ''}`}>
        <div class={`rules__container border--grey padding--medium ${ Theme === 'light' ? 'light__content' : ''}`}>
            <h2 class="text--center margin-tb--large"> Rules </h2>

            <ul class="styled-list styled-list--stacked margin--medium">
                <li>1) Lorem ipsum dolor sit amet consectetur, adipisicing elit. </li>
                <li>2) Hic libero culpa numquam, quidem, sequi similique deserunt laudantium eligendi rerum fugiat neque fugit obcaecati voluptate tempore harum quas inventore quam asperiores.</li>
                <li>3) Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
            </ul>

            <div class="container__flex--center margin--medium">
                <button onClick={() => start()} class="btn btn--light">Accept</button>
            </div>
        </div>
    </div>
  )
}

export default QuizRules
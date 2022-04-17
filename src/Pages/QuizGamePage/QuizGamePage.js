import React from 'react'
import { useParams } from 'react-router-dom';
import { QuizGame } from '../../Components';
import { QuizGameProvider } from '../../Context'

function QuizGamePage() {

  const { id } = useParams()

  return (
    <div>
      <QuizGameProvider>
        <QuizGame gameid={id} />
      </QuizGameProvider>
    </div>
  )
}
export { QuizGamePage }
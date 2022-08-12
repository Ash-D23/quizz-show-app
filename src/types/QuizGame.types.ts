import { QuizAction, QuizGameStateType } from "./QuizGameReducer.types"

export type QuizGameType = { 
  quizGameState: QuizGameStateType,
  quizGameMethods: { 
    submitAnswer: () => void,
    selectAnswer: (selectedAnswer: number) => void },
    quizGameDispatch: React.Dispatch<QuizAction> | null,
    timerObj: { 
      time: number,
      startTimer: () => void, 
      stopTimer: () => void,
      resetTimer: () => void 
    }
}
import { QuizGameStateType } from "./QuizGameReducer.types"

export type QuizGameType = { 
  quizGameState: QuizGameStateType,
  quizGameMethods: { 
    submitAnswer: () => void,
    selectAnswer: (selectedAnswer: number) => void },
    quizGameDispatch: any,
    timerObj: { 
      time: number,
      startTimer: () => void, 
      stopTimer: () => void,
      resetTimer: () => void 
    }
}
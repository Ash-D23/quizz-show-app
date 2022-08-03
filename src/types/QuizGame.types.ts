export type QuizGameType = { 
  quizGameState: string,
  quizGameMethods: { 
    submitAnswer: () => void,
    selectAnswer: (selectedAnswer: string) => void },
    quizGameDispatch: React.Dispatch<any>,
    timerObj: { 
      time: number,
      startTimer: () => void, 
      stopTimer: () => void,
      resetTimer: () => void 
    }
}
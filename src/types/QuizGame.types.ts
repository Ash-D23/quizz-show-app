export type QuizGameType = { quizGameState: any,
    quizGameMethods: { submitAnswer: () => void,
        selectAnswer: (selectedAnswer: string) => void },
         quizGameDispatch: React.Dispatch<any>,
          timerObj: { time: number,
            startTimer: () => void, 
            stopTimer: () => void,
             resetTimer: () => void }
    }
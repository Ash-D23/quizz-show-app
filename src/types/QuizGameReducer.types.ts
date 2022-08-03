import { questionsType } from "./AllQuiz.types"

export type QuizGameStateType ={
    id: string ,
    name: string ,
    questions: questionsType[],
    answers: Array<number>,
    loading: boolean,
    currentQuestion: number,
    currentSelectedOption: number ,
    selectedAnswers: Array<number>, 
    gameState: string
}

export type QuizAction =
    | {
        type: "setQuizData";
        payload: {
            id: string | null,
            name: string | null,
            questions: questionsType[],
            answers: Array<number>,
            gameState: string
        }
    }
    | {
        type: "selectAnswer";
        payload: string | any
    }
    | {
        type: "submitAnswer";
        payload: null
    }
    | {
        type: "submitAnswerAndFinish";
        payload: {
            selectedAnswers: Array<number>,
            score: number
        }
    }
    | {
        type: "gameState";
        payload: {
            gameState: string
        }
    }
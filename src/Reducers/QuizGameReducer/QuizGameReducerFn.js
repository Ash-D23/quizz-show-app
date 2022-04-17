import { QuizGameActions } from "../../Utilities"

export const QuizGameInitialState = {
    id: null,
    name: null,
    questions: [],
    answers: [],
    loading: false,
    currentQuestion: 0,
    currentSelectedOption: null,
    selectedAnswers: [], 
    gameState: "loading"
}

export const QuizGamereducerfn = (state, action)=> {
    switch (action.type){
        case QuizGameActions.SET_QUIZ_DATA:
            return {...state,
                    id: action.payload.id,
                    name: action.payload.name,
                    questions: action.payload.data.questions, 
                    answers: action.payload.data.answers, 
                    gameState: "rules" }
        case QuizGameActions.SELECT_ANSWER:
                return { ...state, currentSelectedOption: action.payload }
        case QuizGameActions.SUBMIT_ANSWER:
                return { ...state, 
                    selectedAnswers: [...state.selectedAnswers, state.currentSelectedOption], 
                    currentSelectedOption: null, 
                    currentQuestion: state.currentQuestion+1}
        case QuizGameActions.SUBMIT_ANSWER_AND_FINISH:
            return { ...state, 
                    selectedAnswers: action.payload.selectedAnswers, 
                    currentSelectedOption: null,
                    gameState: 'results',
                     score: action.payload.score}
        case QuizGameActions.GAME_STATE:
            return { ...state, 
                    gameState: action.payload.gameState}
        default:
            return state
    }
}
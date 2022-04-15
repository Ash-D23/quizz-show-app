import { QuizGameActions } from "../../Utilities"

export const QuizGameInitialState = {
    id: null,
    name: null,
    questions: [],
    answers: [],
    loading: false,
    currentquestion: 0,
    currentselectedoption: null,
    selectedanswers: [], 
    gamestate: "loading"
}

export const QuizGamereducerfn = (state, action)=> {
    switch (action.type){
        case QuizGameActions.SET_QUIZ_DATA:
            return {...state,
                    id: action.payload.id,
                    name: action.payload.name,
                    questions: action.payload.data.questions, 
                    answers: action.payload.data.answers, 
                    gamestate: "rules" }
        case QuizGameActions.SELECT_ANSWER:
                return { ...state, currentselectedoption: action.payload }
        case QuizGameActions.SUBMIT_ANSWER:
                return { ...state, 
                    selectedanswers: [...state.selectedanswers, state.currentselectedoption], 
                    currentselectedoption: null, 
                    currentquestion: state.currentquestion+1}
        case QuizGameActions.SUBMIT_ANSWER_AND_FINISH:
            return { ...state, 
                    selectedanswers: action.payload.selectedanswers, 
                    currentselectedoption: null,
                    gamestate: 'results',
                     score: action.payload.score}
        case QuizGameActions.GAME_STATE:
            return { ...state, 
                    gamestate: action.payload.gamestate}
        case "default":
            return state
    }
}
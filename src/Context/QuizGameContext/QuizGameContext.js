import { createContext, useContext, useReducer, useEffect } from "react";
import useTimer from "../../hooks/timer"
import { db } from '../../firebase';
import { useAuthContext } from "../AuthContext/AuthContext";
import { QuizGameActions } from "../../Utilities";
import { QuizGameInitialState, QuizGamereducerfn } from "../../Reducers";

const QuizGameContext = createContext();

const useQuizGameContext = () => useContext(QuizGameContext)

const QuizGameProvider = ({children}) => {

    const [ quizGameState, quizGameDispatch ] = useReducer(QuizGamereducerfn, QuizGameInitialState)

    const {time, startTimer, stopTimer, resetTimer} = useTimer(10)

    const { user } = useAuthContext()

    useEffect(()=>{
        if(time<=0){
          submitAnswer()
        }
    }, [time])

    const CalculateScoreandShowResults = async ()=>{
        quizGameDispatch({ type: QuizGameActions.GAME_STATE, payload: { gameState: 'loading'} })

        const { answers } = quizGameState
        const finalselectedAnswers = [...quizGameState.selectedAnswers, quizGameState.currentSelectedOption]

        let finalScore = 0;

        answers.forEach((val, index)=>{
          finalScore = val === finalselectedAnswers[index] ? finalScore+1 : finalScore
        })

        const totalQuestions = quizGameState.questions.length
        finalScore = (finalScore/totalQuestions)*100

        try{
            const resultRef = db.ref(`/results/`+user.uid);

            const item = {
                uid: user.uid,
                score: finalScore,
                name: quizGameState.name,
                id: quizGameState.id
            }

            await resultRef.push().set(item)

            quizGameDispatch({type: QuizGameActions.SUBMIT_ANSWER_AND_FINISH, 
            payload: { selectedAnswers: finalselectedAnswers, score: finalScore}})
        }catch(err){
            console.error(err)
        }
    }

    const submitAnswer = ()=> {
        if(quizGameState.currentQuestion === quizGameState.questions.length-1){
            CalculateScoreandShowResults()
            stopTimer()
        }else{
            quizGameDispatch({ type: QuizGameActions.SUBMIT_ANSWER})
            resetTimer()
            startTimer()
        }
    }

    const selectAnswer = (selectedAnswer)=>{
        quizGameDispatch({ type: QuizGameActions.SELECT_ANSWER, payload: selectedAnswer})
    }

    return <QuizGameContext.Provider value={{ quizGameState, quizGameMethods: {
        submitAnswer, selectAnswer
    }, quizGameDispatch, 
    timerObj: { time, startTimer, stopTimer, resetTimer}}}>
        {children}
    </QuizGameContext.Provider>
}

export { QuizGameProvider, useQuizGameContext}
import { createContext, useContext, useReducer, useEffect } from "react";
import useTimer from "../../hooks/timer";
import { db } from '../../firebase';
import { useAuthContext } from "../AuthContext/AuthContext";
import { QuizGameInitialState, QuizGamereducerfn } from "../../Reducers";
import { QuizGameType } from "../../types/QuizGame.types";

const QuizGameContext = createContext<QuizGameType>({ 
    quizGameState: {
        id: "",
        name: "" ,
        questions: [],
        answers: [],
        loading: false,
        currentQuestion: 1,
        currentSelectedOption: 0 ,
        selectedAnswers: [], 
        gameState: ""
    },
    quizGameMethods: { 
      submitAnswer: () => null,
      selectAnswer: () => null },
      quizGameDispatch: null,
      timerObj: { 
        time: 0,
        startTimer: () => null, 
        stopTimer: () => null,
        resetTimer: () => null 
      }
  });

const useQuizGameContext = () => useContext(QuizGameContext)

const QuizGameProvider = ({ children }: { children: React.ReactNode }) => {

    const [ quizGameState, quizGameDispatch ] = useReducer(QuizGamereducerfn, QuizGameInitialState)

    const { time, startTimer, stopTimer, resetTimer } = useTimer(10)

    const auth = useAuthContext()

    const user = auth?.user;

    useEffect(()=>{
        if(time<=0){
          submitAnswer()
        }
    }, [time])

    const CalculateScoreandShowResults = async ()=>{
        quizGameDispatch({ type: "gameState", payload: { gameState: 'loading'} })

        const { answers } = quizGameState
        const finalselectedAnswers = [...quizGameState.selectedAnswers, quizGameState.currentSelectedOption]

        let finalScore = 0;

        answers.forEach((val : Array<number>, index : number)=>{
          finalScore = val === finalselectedAnswers[index] ? finalScore+1 : finalScore
        })

        const totalQuestions = quizGameState.questions.length
        finalScore = (finalScore/totalQuestions)*100

        try{
            const resultRef = db.ref(`/results/`+user?.uid);

            const item = {
                uid: user?.uid,
                score: finalScore,
                name: quizGameState.name,
                id: quizGameState.id,
                date: new Date().toString()
            }

            await resultRef.push().set(item)

            quizGameDispatch({type: "submitAnswerAndFinish", 
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
            quizGameDispatch({ type:  "submitAnswer", payload: null})
            resetTimer()
            startTimer()
        }
    }

    const selectAnswer = (selectedAnswer : number)=>{
        quizGameDispatch({ type: "selectAnswer", payload: selectedAnswer})
    }

    return <QuizGameContext.Provider value={{ quizGameState, quizGameMethods: {
        submitAnswer, selectAnswer
    }, quizGameDispatch, 
    timerObj: { time, startTimer, stopTimer, resetTimer}}}>
        {children}
    </QuizGameContext.Provider>
}

export { QuizGameProvider, useQuizGameContext}
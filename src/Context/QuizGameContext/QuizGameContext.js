import { createContext, useContext, useReducer, useEffect } from "react";
import useTimer from "../../hooks/timer"
import { db } from '../../firebase';
import { useAuthContext } from "../AuthContext/AuthContext";
import { QuizGameActions } from "../../Utilities";
import { QuizGameInitialState, QuizGamereducerfn } from "../../Reducers";

const QuizGameContext = createContext();

const useQuizGameContext = () => useContext(QuizGameContext)

const QuizGameProvider = ({children}) => {

    const [ quizgamestate, quizgamedispatch ] = useReducer(QuizGamereducerfn, QuizGameInitialState)

    const {time, starttimer, stoptimer, resettimer} = useTimer(10)

    const { user } = useAuthContext()

    useEffect(()=>{
        if(time<=0){
          submitanswer()
        }
    }, [time])

    const CalculateScoreandShowResults = async ()=>{
        quizgamedispatch({ type: QuizGameActions.GAME_STATE, payload: { gamestate: 'loading'} })
        const { answers } = quizgamestate
        const finalselectedanswers = [...quizgamestate.selectedanswers, quizgamestate.currentselectedoption]
        let finalscore = 0;
        answers.forEach((val, index)=>{
          finalscore = val === finalselectedanswers[index] ? finalscore+1 : finalscore
        })
        const totalquestions = quizgamestate.questions.length
        finalscore = (finalscore/totalquestions)*100
        try{
            const resultref = db.ref(`/results/`+user.uid);

            const item = {
                uid: user.uid,
                score: finalscore,
                name: quizgamestate.name,
                id: quizgamestate.id
            }

            await resultref.push().set(item)

            quizgamedispatch({type: QuizGameActions.SUBMIT_ANSWER_AND_FINISH, 
            payload: { selectedanswers: finalselectedanswers, score: finalscore}})
        }catch(err){
            console.error(err)
        }
    }

    const submitanswer = ()=> {
        if(quizgamestate.currentquestion === quizgamestate.questions.length-1){
            CalculateScoreandShowResults()
            stoptimer()
        }else{
            quizgamedispatch({ type: QuizGameActions.SUBMIT_ANSWER})
            resettimer()
            starttimer()
        }
    }

    const selectanswer = (selectedanswer)=>{
        quizgamedispatch({ type: QuizGameActions.SELECT_ANSWER, payload: selectedanswer})
    }

    return <QuizGameContext.Provider value={{ quizgamestate, quizgamemethods: {
        submitanswer, selectanswer
    }, quizgamedispatch, 
    timerobj: { time, starttimer, stoptimer, resettimer}}}>
        {children}
    </QuizGameContext.Provider>
}

export { QuizGameProvider, useQuizGameContext}
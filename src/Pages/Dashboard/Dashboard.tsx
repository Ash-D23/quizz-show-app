import React, {useEffect, useState} from 'react';
import { QuizResultCard, Loader, ActivityChart } from '../../Components';
import { useAuthContext } from '../../Context';
import { db } from '../../firebase';
import { ResultsArrType, ResultsType } from '../../types/AllQuiz.types';
import './Dashboard.css';

function Dashboard() : JSX.Element {

  const [results, setresults] = useState<ResultsArrType>([]);
  const [resultsLimit, setresultsLimit] = useState(5)
  const [isLoading, setisLoading] = useState(false);

  const auth = useAuthContext()

  const user = auth?.user;

  useEffect(() => {
    (async function(){
        setisLoading(true)
        try{
          const dashboard = db.ref('/results/'+user?.uid);
          const snapshot = await dashboard.once('value');
          const value : ResultsArrType = Object.values(snapshot.val())
          setresults(value.reverse())
        }catch(err){
          console.error(err)
        }finally{
          setisLoading(false)
        }
      })()    
  }, [])

  const gamesPalyed = results?.length || 0;
  const totalScore = results?.reduce((acc,curr : ResultsType) => acc+curr.score, 0) || 0
  const highScore = results?.reduce((acc,curr: ResultsType) => curr.score > acc ? curr.score : acc, 0) || 0

  const ShowLoadButton = () => {
    const len = results.length

    if(len < 5){
      return null
    }

    if(resultsLimit === 5){
      return (
      <div className='container__flex--center padding--large'>
        <button onClick={()=> setresultsLimit(results.length)} className='btn btn--light'>View All</button>
      </div>)
    }

    return (<div className='container__flex--center padding--large'>
      <button onClick={()=> setresultsLimit(5)} className='btn btn--light'>View Less</button>
    </div>)
  }
  
  return isLoading ? <Loader /> : (
    <div className='dashboard--container'>
        <h2 className="text--center category--heading text--light margin--large">Dashboard</h2>

        <div className="stat__container padding--large">
            <div className="stat">
                <p>Games Played</p>
                <p>{gamesPalyed}</p>
            </div>

            <div className="stat">
                <p>Total Points</p>
                <p>{totalScore}</p>
            </div>

            <div className="stat">
                <p>Highest Score</p>
                <p>{highScore}</p>
            </div>
        </div>

        <ActivityChart results={results} />

        <div className="padding--large">
            <h2 className="text--center category--heading text--light margin--large">Quiz Results</h2>

            <div className="container__flex--center container__flex--wrap">
              {results ? (
                <div className='game-results'>
                  <div className='container__flex--spacebetween result-heading--container padding--large'>
                      <p>Name</p>
                      <p>Score</p>
                  </div>
                  {results.slice(0,resultsLimit).map((item, index) => <QuizResultCard key={index} game={item} />)}
                  {ShowLoadButton()}
                </div>
                ) 
                :
               (<div className='empty-list--container'>
                  <img src="/Images/blank.svg" alt="not found" />
                  <h2 className='text--center padding--medium'>No Items Found</h2>
                </div>)}
            </div>
        </div>
    </div>
  )
}

export { Dashboard }
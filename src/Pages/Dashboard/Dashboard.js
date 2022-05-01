import React, {useEffect, useState} from 'react';
import { SingleQuiz, Loader, ActivityChart } from '../../Components';
import { useAuthContext } from '../../Context';
import { db } from '../../firebase';
import './Dashboard.css';

function Dashboard() {

    const [results, setresults] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const { user } = useAuthContext();

  useEffect(() => {
    (async function(){
        setisLoading(true)
        try{
          const dashboard = db.ref('/results/'+user?.uid);
          const snapshot = await dashboard.once('value');
          const value = Object.values(snapshot.val())
          setresults(value.reverse())
        }catch(err){
          console.error(err)
        }finally{
          setisLoading(false)
        }
      })()    
  }, [])

  const gamesPalyed = results?.length || 0;
  const totalScore = results?.reduce((acc,curr) => acc+curr.score, 0) || 0
  const highScore = results?.reduce((acc,curr) => curr.score > acc ? curr.score : acc, 0) || 0
  
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
                {results ? results.map((item, index) => <SingleQuiz key={index} game={item} result={true} />) :
                <div className='empty-list--container'>
                <img src="/Images/blank.svg" alt="not found" />
                <h2 className='text--center padding--medium'>No Items Found</h2>
              </div>}
                
            </div>
        </div>
    </div>
  )
}

export { Dashboard }
import React, {useEffect, useState} from 'react';
import { SingleQuiz, Loader } from '../../Components';
import { useAuthContext } from '../../Context';
import { db } from '../../firebase';
import './Dashboard.css';

function Dashboard() {

    const [results, setresults] = useState();
    const [isLoading, setisLoading] = useState(false);

    const { user } = useAuthContext();

  useEffect(() => {
    (async function(){
        setisLoading(true)
        try{
          const categories = db.ref('/results/'+user?.uid);
          const snapshot = await categories.once('value');
          const value = Object.values(snapshot.val())
          setresults(value)
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
    <div>
        <h2 class="text--center category--heading text--light margin--large">Dashboard</h2>

        <div class="stat__container padding--large">
            <div class="stat">
                <p>Games Played</p>
                <p>{gamesPalyed}</p>
            </div>

            <div class="stat">
                <p>Total Points</p>
                <p>{totalScore}</p>
            </div>

            <div class="stat">
                <p>Highest Score</p>
                <p>{highScore}</p>
            </div>
        </div>

        <div class="padding--large">
            <h2 class="text--center category--heading text--light margin--large">Quiz Results</h2>

            <div class="container__flex--center container__flex--wrap">
                {results?.map((item) => <SingleQuiz game={item} result={true} />)}
            </div>
        </div>
    </div>
  )
}

export { Dashboard }
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { SingleQuiz, Loader } from '../../Components/';
import { db } from '../../firebase';
import { CategoryParamType, GamesType, SearchParamType } from '../../types/AllQuiz.types';
import { filterbyCategory, filterbySearch } from '../../Utilities';
import './AllQuizPage.css'

function AllQuizPage() {

  const [games, setgames] = useState(null)
  const [isLoading, setisLoading] = useState(true)

  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async function(){
      try{
        const allGames = db.ref('/Games');
        const snapshot = await allGames.once('value');
        setgames(snapshot.val())
      }catch(err){
        console.error(err)
      }finally{
        setisLoading(false)
      }
    })()
    
  }, [])

  const filterGames = () => {
    const category : CategoryParamType  = searchParams.get('category')
    const search : SearchParamType = searchParams.get('search')
    const filteredByCategory = filterbyCategory(games, category)
    return filterbySearch(filteredByCategory, search)
  }

  const filteredGames = filterGames()

  return (
    <div className="padding--large allQuiz--container">
            { filteredGames?.length !== 0 ? <h2 className="text--center margin--medium category--heading text--light">Play Now</h2> : null }
            { isLoading && <Loader />}
            <div className="container__flex--center container__flex--wrap">
                { filteredGames?.map((item : GamesType) => <SingleQuiz key={item?.id} game={item} result={null} />) }
                { filteredGames?.length === 0 ? <div className='empty-list--container'>
                <img src="/Images/blank.svg" alt="not found" />
                <h2 className='text--center padding--medium'>No Items Found</h2>
              </div>: null}
            </div>
           
    </div>
  )
}

export { AllQuizPage }
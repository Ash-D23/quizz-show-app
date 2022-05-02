import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { SingleQuiz, Loader } from '../../Components/';
import { db } from '../../firebase';
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

  const filterbyCategory = (arr, category) => {
    if(!category){
      return arr
    }
    return arr?.filter((item) => item.category === parseInt(category))
  }

  const filterbySearch = (arr, search) => {
    if(!search){
      return arr
    }
    return arr?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  }

  const filterGames = () => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const filteredByCategory = filterbyCategory(games, category)
    return filterbySearch(filteredByCategory, search)
  }

  const filteredGames = filterGames()

  return (
    <div className="padding--large allQuiz--container">
            { filteredGames?.length !== 0 ? <h2 className="text--center margin--medium category--heading text--light">Play Now</h2> : null }
            { isLoading && <Loader />}
            <div className="container__flex--center container__flex--wrap">
                { filteredGames?.map((item) => <SingleQuiz key={item?.id} game={item} />) }
                { filteredGames?.length === 0 ? <div className='empty-list--container'>
                <img src="/Images/blank.svg" alt="not found" />
                <h2 className='text--center padding--medium'>No Items Found</h2>
              </div>: null}
            </div>
           
    </div>
  )
}

export { AllQuizPage }
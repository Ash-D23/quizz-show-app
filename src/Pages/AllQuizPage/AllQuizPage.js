import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import SingleQuiz from '../../Components/SingleQuiz/SingleQuiz';
import { db } from '../../firebase';

function AllQuizPage() {

  const [games, setgames] = useState([])

  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async function(){
      try{
        const categories = db.ref('/Games');
        const snapshot = await categories.once('value');
        setgames(snapshot.val())
      }catch(err){
        console.error(err)
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
    <div class="padding--large">
            <h2 class="text--center margin--medium category--heading text--light">Play Now</h2>

            <div class="container__flex--center container__flex--wrap">
                { filteredGames?.map((item) => <SingleQuiz key={item?.id} game={item} />)}
            </div>
    </div>
  )
}

export { AllQuizPage }
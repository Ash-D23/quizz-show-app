import React, {useState, useEffect} from 'react';
import { CategoryCard, Loader } from '../../Components';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import './HomePage.css'
import { CategoryArrType, CategoryType } from '../../types/AllQuiz.types';

function HomePage() : JSX.Element {
  const [category, setcategory] = useState<CategoryArrType>([])
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    (async function(){
      setisLoading(true)
      try{
        const categories = db.ref('/Categories');
        const snapshot = await categories.once('value');
        setcategory(snapshot.val())
      }catch(err){
        console.error(err)
      }finally{
        setisLoading(false)
      }
    })()
    
  }, [])
  
  return (
    <>
      <div className="quiz--main padding--medium ">
        <div className="about__description padding--medium">
            <div>
              <h2 className="text--light text--center margin-tb--large">Welcome to QuizzShow</h2>
            </div>
            <div>
              <p className='text--large text--center margin-bottom--medium'> 
                  Let's Begin the show
              </p>
            </div>
            <div className="container__flex--center margin-tb--large">
                <Link to="/explore"><button className="btn btn--outline">Explore</button></Link>
            </div>
            <div className='flip--container'>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src="./Images/quiz.jpg" alt="Avatar" />
                  </div>
                  <div className="flip-card-back">
                    <p>
                    “The scientist is not a person who gives the right answers, he's one who asks the right questions.”
                    ― Claude Levi-Strauss
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="home--image">
          <img src="./Images/main.svg" alt="question" />
        </div>
      </div>
      <div className="category--container quiz__category">
        <div className="container__flex--center margin-bottom--large padding--medium">
            <h2 className='category--heading text--light'>Categories</h2>
        </div>
        { isLoading && <Loader />}
        <div className="container__flex--center container__flex--wrap">
            {category?.map((item: CategoryType)=>{
              return <CategoryCard key={item?.id} category={item} />
            })}
        </div>
      </div>
    </>
  )
}

export { HomePage }
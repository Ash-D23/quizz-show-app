import React from 'react'
import { useNavigate } from 'react-router-dom'

function CategoryCard({ category: {id, imgurl, name}}) {

  const navigate = useNavigate();

  return (
    <div onClick={()=> navigate('/explore?category='+id)} className="category--card container--relative">
        <div className="category--image">
          <img src={imgurl} alt="category" />
        </div>
        <h3 className="category--title">{name}</h3>
        <div className="category--overlay shadow--bottom">
        </div>
    </div>
  )
}

export { CategoryCard }
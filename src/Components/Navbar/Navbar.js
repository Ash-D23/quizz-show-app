import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext, useTheme } from '../../Context';
import { db } from '../../firebase';
import './Navbar.css'

function Navbar() {
    const [showmenu, setshowmenu] = useState(false)
    const [search, setSearch] = useState('')
    const [showSearchItems, setShowSearchItems] = useState(false)
    const [Games, setGames] = useState([])

    const { Theme, setDarkMode, setLightMode } = useTheme()
    const { user, signOut } = useAuthContext()

    const searchInput = useRef(null)
    const searchInputMobile = useRef(null)

    let navigate = useNavigate()

    useEffect(()=>{
        (async function(){
            try{
                const games = db.ref('/Games');
                const snapshot = await games.once('value');
                setGames(snapshot.val())
              }catch(err){
                console.error(err)
              }
        })()
    }, [])

    const searchHandler = (e) => {
        if(e.keyCode === 13){
            searchSubmit()
        }
    }

    const searchSubmit = () => {
        let path = '/explore?search='+search
        handleClear()
        navigate(path)
    }

    const handleClear = () => {
        setSearch('')
        setShowSearchItems(false)
    }

    const handleNavigate = (id) => {
        handleClear()
        navigate('/quizgame/'+id)
    }

    const filterGamesBySearch = (Games, search) => {
        if(search === null){
            return Games
        }
    
        return Games.filter((item) => item?.name?.toLowerCase().includes(search.toLowerCase() ))
    }
        
    const SearchGames = filterGamesBySearch(Games, search)

  return (
    <div>
        <div className="navbar__container quiz--nav padding--medium">
            <div className="navbar__heading-container">
                <div className="navbar__title">
                    <Link to="/">QuizzShow</Link>
                </div>
                <div onClick={()=> setshowmenu(prev => !prev)} className="navbar__menu">
                    { !showmenu ? <i className="fas fa-bars icon__menu"></i> : <i className="fas fa-times icon__times"></i>}
                    
                </div>
            </div>
            <div className='container--relative Games-search'>
                    <div className="search__container">
                        <i onClick={searchSubmit} className="fas fa-search padding--small text--medium pointer"></i>
                        <input 
                        onChange={(e)=>setSearch(e.target.value)} 
                        onFocus={() => setShowSearchItems(true)}
                        ref={searchInput}
                        value={search} 
                        className="search__input" 
                        placeholder="Search" 
                        type="text" 
                        onKeyDown={searchHandler}
                        />
                        { showSearchItems ? <i onClick={handleClear} className="fas fa-times padding--small text--medium pointer"></i> : null }
                    </div>
                    { SearchGames.length === 0 ? 
                    <div style={{ height: `2rem`}}
                    className={`search__items ${ showSearchItems ? `search__items--display` : ''}`}>
                       <p className='search__items--list text--center'>No videos Found</p>
                   </div>
                    : <div style={{ height: `${2 + SearchGames.length*2}rem`}}
                     className={`search__items ${ showSearchItems ? `search__items--display` : ''}`}>
                        {SearchGames?.map((item) => <p key={item?._id} onClick={(e) => handleNavigate(item?.id)} className='search__items--list'>{item.name}</p>)}
                    </div>}
            </div>
            <ul className={`navbar__list-container ${showmenu ? 'navbar__display': null}`}>
                <li className="navbar__item">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="navbar__item">
                    <Link to="/explore">Explore</Link>
                </li>
                { user ? <li className="navbar__item profile">
                    <Link to="/profile"><i className="fas fa-user"></i><span className='margin-left--small'>Profile</span></Link>
                </li> : null }
                { Theme==="light" ? <button onClick={setDarkMode} className="btn btn--secondary btn--icon moon padding--medium"><i className="fas fa-moon text--medium"></i><span>Dark Mode</span></button> :
                <button onClick={setLightMode} className="btn btn--secondary btn--icon sun padding--medium"><i className="fas fa-sun text--medium"></i><span>Light Mode</span></button> }
                { !user ? <button onClick={() => navigate('/login')} className='btn btn--secondary background--light margin-left--medium'>Login</button> : 
                <button onClick={signOut} className='btn btn--light margin--medium'>Logout</button> }
            </ul>
        </div>
        <div className='container--relative'>
              <div className="mobile__search__container">
                  <i onClick={searchSubmit} className={`fas fa-search padding--small text--medium pointer ${ Theme === "light" ? 'clr--secondary': ''}`}></i>
                  <input 
                      onChange={(e)=>setSearch(e.target.value)} 
                      value={search} 
                      onFocus={() => setShowSearchItems(true)}
                      ref={searchInputMobile}
                      className="search__input" 
                      placeholder="Search" 
                      type="text" 
                      onKeyDown={searchHandler}
                      />
                    { showSearchItems ? <i onClick={handleClear} className={`fas fa-times padding--small text--medium pointer ${ Theme === "light" ? 'clr--secondary': ''} pointer`}></i> : null }
              </div>
              { SearchGames.length === 0 ? 
                    <div style={{ height: `2rem`}}
                    className={`search__items ${ showSearchItems ? `search__items--mobiledisplay` : ''}`}>
                       <p className='search__items--list text--center text--light'>No videos Found</p>
                   </div>
                    : <div style={{ height: `${2 + SearchGames.length*2}rem`}}
                     className={`search__items ${ showSearchItems ? `search__items--mobiledisplay` : ''}`}>
                        {SearchGames?.map((item) => <p key={item?._id}  onClick={(e) => handleNavigate(item?.id)} className='search__items--list'>{item.name}</p>)}
              </div>}
          </div>
    </div>
  )
}

export { Navbar }
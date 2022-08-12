import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext, useTheme } from '../../Context';
import { db } from '../../firebase';
import { GamesArrType, GamesType } from '../../types/AllQuiz.types';
import './Navbar.css'

function Navbar() {
    const [showmenu, setshowmenu] = useState(false)
    const [search, setSearch] = useState('')
    const [showSearchItems, setShowSearchItems] = useState(false)
    const [Games, setGames] = useState([])

    const ThemeValue  = useTheme()
    const Theme = ThemeValue?.Theme
    const setDarkMode = ThemeValue?.setDarkMode
    const setLightMode = ThemeValue?.setLightMode

    const auth = useAuthContext()
    const user = auth?.user;
    const signOut = auth?.signOut

    const searchInput = useRef<HTMLInputElement>(null)
    const searchInputMobile = useRef<HTMLInputElement>(null)

    let navigate = useNavigate()

    const closeMenu = () => setshowmenu(false)

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

    useEffect(() => {
        const closeSearchMenu = () => {
          setSearch('')
          setShowSearchItems(false)
        }
    
        const handleClickOutside = (e : any)=>{
          const isClickedOutsideInput = (searchInput.current && searchInput.current.contains(e.target)) || 
          (searchInputMobile.current && searchInputMobile.current.contains(e.target))
          if(!isClickedOutsideInput){
              closeSearchMenu()
          }
       }
    
        document.body.addEventListener('click', handleClickOutside)
    
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
      }, [])

    const searchHandler = (e : any) => {
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

    const handleNavigate = (id : number) => {
        handleClear()
        navigate('/quizgame/'+id)
    }

    const navigateToLogin = () => {
        closeMenu()
        navigate('/login')
    }

    const filterGamesBySearch = (Games : GamesArrType, search : string) => {
        if(search === null){
            return Games
        }
    
        return Games?.filter((item : GamesType) => item?.name?.toLowerCase().includes(search.toLowerCase() ))
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
                    { SearchGames?.length === 0 ? 
                    <div style={{ height: `2rem`}}
                    className={`search__items ${ showSearchItems ? `search__items--display` : ''}`}>
                       <p className='search__items--list text--center'>No videos Found</p>
                   </div>
                    : <div style={{ height: `${SearchGames ? 2 + SearchGames.length*2 : 0}rem`}}
                     className={`search__items ${ showSearchItems ? `search__items--display` : ''}`}>
                        {SearchGames?.map((item : GamesType) => <p key={item?.id} onClick={(e) => handleNavigate(item?.id)} className='search__items--list'>{item.name}</p>)}
                    </div>}
            </div>
            <ul className={`navbar__list-container ${showmenu ? 'navbar__display': null}`}>
                <li className="navbar__item">
                    <Link onClick={closeMenu} to="/dashboard">Dashboard</Link>
                </li>
                <li className="navbar__item">
                    <Link onClick={closeMenu} to="/explore">Explore</Link>
                </li>
                { user ? <li className="navbar__item profile">
                    <Link onClick={closeMenu} to="/profile"><i className="fas fa-user"></i><span className='margin-left--small'>Profile</span></Link>
                </li> : null }
                { Theme==="light" ? <button onClick={() => {
                    setDarkMode()
                    closeMenu()
                } } className="btn btn--secondary btn--icon moon padding--medium"><i className="fas fa-moon text--medium"></i><span>Dark Mode</span></button> :
                <button onClick={() => {
                    setLightMode()
                    closeMenu()
                    }} className="btn btn--secondary btn--icon sun padding--medium"><i className="fas fa-sun text--medium"></i><span>Light Mode</span></button> }
                { !user ? <button onClick={navigateToLogin} className='btn btn--light margin--medium'>Login</button> : 
                <button onClick={()=> {
                    closeMenu()
                    if(signOut){
                        signOut()
                    }
                }} className='btn btn--light margin--medium'>Logout</button> }
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
              { SearchGames?.length === 0 ? 
                    <div style={{ height: `2rem`}}
                    className={`search__items ${ showSearchItems ? `search__items--mobiledisplay` : ''}`}>
                       <p className='search__items--list text--center text--light'>No videos Found</p>
                   </div>
                    : <div style={{ height: `${SearchGames ? 2 + SearchGames.length*2 : 0}rem`}}
                     className={`search__items ${ showSearchItems ? `search__items--mobiledisplay` : ''}`}>
                        {SearchGames?.map((item : GamesType) => <p key={item?.id}  onClick={(e) => handleNavigate(item?.id)} className='search__items--list'>{item.name}</p>)}
              </div>}
          </div>
    </div>
  )
}

export { Navbar }
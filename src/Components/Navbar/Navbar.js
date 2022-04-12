import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext/ThemeContext';
import './Navbar.css'

function Navbar() {
    const [showmenu, setshowmenu] = useState(false)

    const [search, setsearch] = useState('')

    const { Theme, setDarkMode, setLightMode } = useTheme()

    let navigate = useNavigate()

    const searchHandler = (e) => {
        if(e.keyCode === 13){
            searchSubmit()
        }
    }

    const searchSubmit = () => {
        let path = '/explore?search='+search
        console.log(path)
        setsearch('')
        navigate(path)
    }

  return (
    <div>
        <div className="navbar__container padding--medium">
            <div className="navbar__heading-container">
                <div className="navbar__title">
                    <Link to="/">QuizzShow</Link>
                </div>
                <div onClick={()=> setshowmenu(prev => !prev)} className="navbar__menu">
                    { !showmenu ? <i className="fas fa-bars icon__menu"></i> : <i className="fas fa-times icon__times"></i>}
                    
                </div>
            </div>
            <div className="search__container margin-lr--small">
                <i onClick={searchSubmit} className="fas fa-search padding--small text--medium"></i>
                <input 
                onChange={(e)=>setsearch(e.target.value)} 
                value={search} 
                className="search__input" 
                placeholder="Search" 
                type="text" 
                onKeyDown={searchHandler}
                />
            </div>
            <ul className={`navbar__list-container ${showmenu ? 'navbar__display': null}`}>
                <li className="navbar__item">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="navbar__item">
                    <Link to="/explore">Explore</Link>
                </li>
                { Theme==="light" ? <button onClick={setDarkMode} class="btn btn--secondary btn--icon moon padding--medium"><i class="fas fa-moon text--medium"></i><span>Dark Mode</span></button> :
                <button onClick={setLightMode} class="btn btn--secondary btn--icon sun padding--medium"><i class="fas fa-sun text--medium"></i><span>Light Mode</span></button> }
            </ul>
        </div>
        <div className="mobile__search__container">
            <i onClick={searchSubmit} className="fas fa-search padding--small text--medium"></i>
            <input 
                onChange={(e)=>setsearch(e.target.value)} 
                value={search} 
                className="search__input" 
                placeholder="Search" 
                type="text" 
                onKeyDown={searchHandler}
            />
        </div>
    </div>
  )
}

export { Navbar }
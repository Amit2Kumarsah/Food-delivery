import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import AccountMain from '../Account/AccountMain'

function Navbar({setShowLogin}) {

    const [menu, setMenu] = useState("home");

    const {getTotalCartAmount, token, searchFoods, setSearchFoods} = useContext(StoreContext);
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
           <Link to='/'  onClick={() => setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <li><a href='#explore-menu' onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>menu</a></li>
            <li><a href='#footer' onClick={() => setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a></li>
        </ul>

        <div className="navbar-right">
            {searchFoods ? <p onClick={() => setSearchFoods(false)}>X</p>:<img src={assets.search_icon} alt="" onClick={() => setSearchFoods(true)}/>}
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                {getTotalCartAmount()>0 && <div className="dot"></div>}
            </div>
            {!token?<button onClick={() =>setShowLogin(true)}>sign in</button>:<AccountMain/>}
        </div>
    </div>
  )
}

export default Navbar
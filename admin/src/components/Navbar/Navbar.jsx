import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets'

function Navbar() {
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo'/>
        <img src={assets.profile_image} alt="" className='profile'/>
    </div>
  )
}

export default Navbar
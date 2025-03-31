import React from 'react'
import './Navbar.css' 
import logo from '../assets/images/LOGO.png'
import search from '../assets/images/search.svg'
import photo from '../assets/images/profile_pic.png'
import bell from '../assets/images/bell.png';
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" className='logo'/>
        <ul>
          <li><a href=""></a> Home</li>
          <li><a href=""></a> TV Shows</li>
          <li><a href=""></a> Movies</li>
          <li><a href=""></a> New And Popular</li>
          <li><a href=""></a> My List</li>
          <li><a href=""></a> Languages </li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="" className="icon" />
        <span >Children</span>
        <img src={bell} alt="" className="icon" />
        <div className='profile'>
          <img src={photo} alt="" className="profile-pic" />
          <span color='white'> &#11206;</span>
          <div className="dropdown">
              <p>Sign Out of Netflix</p>
            </div>
        </div>
          
      </div>
    </div>
  )
}
export default Navbar
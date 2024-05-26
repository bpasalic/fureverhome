import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ toggleModal}) => {
  return (
    <header className='header'>
      <header className='navig'>
        <nav className="navbar">
          <div className="logo">
            <img src="whitelogo.png" alt="Logo aplikacije"/>
          </div>
          <div className="app-title">
            <h1  >FurEverHome</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/dogs">Lista pasa</Link>
            </li>
            <li>
              <Link to="/breeds">Pasmine</Link>
            </li>
          </ul>
        </nav>
      </header>
    </header>
  )
}

export default Header

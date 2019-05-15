import React from 'react'
import { Link } from "react-router-dom";
import { gameHeader } from './Header.module.css';

const Header = () => {
  return (
    <header className={gameHeader}>
      <h1>
        <Link to="/">
          Cipher
        </Link>
      </h1>
    </header>
  )
}

export default Header;

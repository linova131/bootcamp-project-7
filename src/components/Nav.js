import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
  return (
    <nav className ="main-nav">
    <ul>
      <li><NavLink to="/fjords">Fjords</NavLink></li>
      <li><NavLink to="/glaciers">Glaciers</NavLink></li>
      <li><NavLink to="/icebergs">Icebergs</NavLink></li>
    </ul>
  </nav>
  )
}

export default Nav;
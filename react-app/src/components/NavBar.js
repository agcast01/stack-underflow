
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import QuestionSearch from '../QuestionSearch';
import { useSelector } from 'react-redux';

const NavBar = ({location, setLocation}) => {
  const user = useSelector(state => state.session.user)
  function checkUser() {
    if (user === null) {
      return (
        <div>
          <button  id='login'>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </button>
          <button id='signup'>
            <NavLink to='/sign-up' exact={true} activeClassName='active' >
              Sign Up
            </NavLink>
          </button>
        </div>
      )
    }
    return (
      <div>
        <button>{user.username}</button>
        <LogoutButton />
      </div>
    )
  }

  return (
    <div className='head'>
      <nav className='navbar'>
        <NavLink to='/' onClick={() => setLocation('/')}>stackunderflow</NavLink>
        
        <QuestionSearch />
        {checkUser()}
      </nav>
    </div>
  );
}

export default NavBar;

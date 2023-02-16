
import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import QuestionSearch from '../QuestionSearch';
import { useSelector } from 'react-redux';
import '../components/auth/auth.css'

const NavBar = ({ location, setLocation }) => {
  const user = useSelector(state => state.session.user)
  const history = useHistory();
  const path = useLocation()
  function checkUser() {
    if (user === null) {
      return (
        <div>
          <button id='login'>
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
        <button id='userbutton' onClick={() => history.push(`/users/${user.id}`)}>{user.username}</button>
        <LogoutButton />
      </div>
    )
  }

  return (
    <div className='head'>
      <nav className='navbar'>
        <NavLink to='/' onClick={() => setLocation('/')}>
          <img className='logo' src='https://i.imgur.com/Lqj9luv.png' alt='logo' />
        </NavLink>

        {path.pathname === '/' && <QuestionSearch />}
        {checkUser()}
      </nav>
    </div>
  );
}

export default NavBar;


import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import QuestionSearch from '../QuestionSearch';
import { useSelector } from 'react-redux';
import '../components/auth/auth.css'

const NavBar = ({location, setLocation}) => {
  const user = useSelector(state => state.session.user)
  const history = useHistory();
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
        <button id='userbutton' onClick={() => history.push(`/users/${user.id}`)}>{user.username}</button>
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

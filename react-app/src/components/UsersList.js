import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id} className='user'>
        <NavLink to={`/users/${user.id}`} className='user-name'>{user.username}</NavLink>
        <p>{user.location !== null && user.location}</p>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul className='user-list'>{userComponents}</ul>
    </>
  );
}

export default UsersList;

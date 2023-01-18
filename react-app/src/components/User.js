import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const currUser = useSelector(state => state.session.user)

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }
  console.log(user.questions)
  return (
    <div className='user-page'>
      <div>
        <h2>{user.username}</h2>
        <p>{user.location !== null && (<> <span class="material-symbols-outlined">
          location_on
        </span> user.location</>)}</p>
        {currUser !== null && user.id === currUser.id &&
          <Link to={`/users/${userId}/edit`}>Edit Profile</Link>
        }
      </div>


      <div className='user-info'>
        <div >
          <h3>About</h3>
          <div>{user.about_me || 'Nothing cool about me yet'}</div>
        </div>
        <div>
          <h3>Questions</h3>
          <ul className='user-listings'>
            {(user.questions && user.questions.length && user.questions.map(question => (
              <li key={question}><p>{question}</p></li>
            ))) || (<li>No questions yet</li>)}
          </ul>
        </div>
        <div>
          <h3>
            Answers
          </h3>
          <ul className='user-listings'>
            {(user.answers && user.answers.length && user.answers.map(question => (
              <li key={question}><p>{question}</p></li>
            ))) || (<li>No answers yet</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default User;

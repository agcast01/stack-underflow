import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllQuestions from './components/AllQuestions';
import SingleQuestion from './components/SingleQuestion';
import CreateQuestion from './components/CreateQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import UpdateAnswer from './components/UpdateAnswer';
import UpdateProfile from './components/UpdateProfile';
import { getQuestions } from './store/question';
import { getAnswers } from './store/answer';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
      dispatch(getQuestions())
      dispatch(getAnswers())
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
        <Route exact path="/questions">
          <AllQuestions />
        </Route>
        <Route path="/questions/new">
          <CreateQuestion />
        </Route>
        <Route path="/questions/edit/:questionId">
          <UpdateQuestion />
        </Route>
        <Route exact path="/questions/:questionId">
          <SingleQuestion />
        </Route>
        <Route path="/answers/:answerId">
          <UpdateAnswer />
        </Route>
        <Route path="/users/:userId/edit">
          <UpdateProfile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

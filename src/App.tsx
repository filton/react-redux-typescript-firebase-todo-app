import React, { FC, useEffect } from 'react';
import firebase from './config/firebase';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from './store/actions/authActions';
import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Homepage from './components/pages/Homepage';
import NavBar from './components/pages/NavBar';
import Register from './components/pages/Register';
import LogIn from './components/pages/LogIn';
import TodoList from './components/pages/TodoList';
import TodoDetails from './components/pages/TodoDetails';
import PageNotFound from './components/pages/PageNotFound';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <PublicRoute path='/' component={Homepage} exact />
        <PublicRoute path='/register' component={Register} exact />
        <PublicRoute path='/login' component={LogIn} exact />
        <PrivateRoute path='/todos' component={TodoList} exact />
        <PrivateRoute path='/todos/:id' component={TodoDetails} exact />
        <Route path='*' component={PageNotFound} exact={true} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

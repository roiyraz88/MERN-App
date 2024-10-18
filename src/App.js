import React, { useState, useCallback } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/contex/auth-contex';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path='/' exact element={<Users />} />
        <Route path='/:userId/places' exact element={<UserPlaces />} />
        <Route path='/places/new' exact element={<NewPlace />} />
        <Route path='/places/:placeId' exact element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' exact element={<Users />} />
        <Route path='/:userId/places' exact element={<UserPlaces />} />
        <Route path='/auth' exact element={<Auth />} />
        <Route path="*" element={<Navigate to='/auth' />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation /> 
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

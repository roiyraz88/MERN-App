import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return ( 
  <Router>
    <MainNavigation />
    <main>
    <Routes>
      <Route path='/' exact element = {<Users />} />
      <Route path='/places/new' exact element = {<NewPlace />} />
      <Route path="*" element={<Navigate to="/" />} />  
    </Routes>
    </main>
  </Router>
)}

export default App;

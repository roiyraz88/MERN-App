import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

function App() {
  return ( 
  <Router>
    <img src='/assets/pexels-jaime-reimer-1376930-2662116.jpg'/>
    <Routes>
      <Route path='/' exact element = {<Users />} />
      <Route path='/places/new' exact element = {<NewPlace />} />
      <Route path="*" element={<Navigate to="/" />} />  
    </Routes>
  </Router>
)}

export default App;

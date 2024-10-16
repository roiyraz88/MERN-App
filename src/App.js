import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';


function App() {
  return ( 
  <Router>
    <MainNavigation />
    <main>
    <Routes>
      <Route path='/' exact element = {<Users />} />
      <Route path='/places/new' exact element = {<NewPlace />} />
      <Route path='/places/:placeId' exact element= {<UpdatePlace />}/>
      <Route path='/:userId/places' exact element ={<UserPlaces />}/>
      <Route path="*" element={<Navigate to="/" />} />  
    </Routes>
    </main>
  </Router>
)}

export default App;

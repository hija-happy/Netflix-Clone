import React from 'react'
import Landing from './pages/Landing-Page/Landing';
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';

const App = () => {
  return (
    <div>
   <Routes>
    <Route path='/' element={<Landing />} />
  <Route path="/login" element={<Login />} />          
  <Route path="/home" element={<Home />} />       
  <Route path="/player/:id" element={<Player />} />
</Routes>

    </div>
  )
}

export default App
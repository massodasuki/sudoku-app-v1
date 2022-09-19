import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Topics from './components/Topics';
import Settings from './components/Settings';


function App () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/topics' element={<Topics />} />
      <Route path='/settings' element={<Settings />} />
    </Routes>
  )
}

export default App

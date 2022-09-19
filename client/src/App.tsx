import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import SudokuPdf from './components/SudokuInPdf';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sudoku' element={<SudokuPdf />} />
    </Routes>
  )
}

export default App

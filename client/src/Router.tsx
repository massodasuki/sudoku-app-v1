import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SudokuPdf from './components/SudokuInPdf';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sudoku' element={<SudokuPdf />} />
    </Routes>
  );
}
export default RouterComponent;

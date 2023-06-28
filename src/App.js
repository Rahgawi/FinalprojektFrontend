import './App.css';
import {  Routes ,Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <div>
    <h1>HolidayBreak</h1>
     <Routes>
     <Route path="/" element={<Home />} />
     
     </Routes>
   </div>
  );
}
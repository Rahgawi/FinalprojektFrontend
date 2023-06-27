
import './App.css';
import {  Routes ,Route } from 'react-router-dom';
import Alarms from './pages/Alarms';

export default function App() {
  return(
  
      <div>
        <h1>HolidayBreak</h1>
        <Routes>
        <Route path="/" component={Alarms} />
        
        </Routes>
      </div>
    
  )
}



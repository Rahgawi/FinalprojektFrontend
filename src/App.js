import './App.css';
import {  Routes ,Route } from 'react-router-dom';
import Home from './pages/Home';
import AlarmForm from './components/Alarmform';
import AlarmList from './components/AlarmList';
import AlarmItem from './components/Alarmitem';

export default function App() {
  return(

    //1. AlarmList zum Routing hinzufügen => Bedenken, dass AlarmForm Kind von Alarmlist ist
    //2. Überlegen, wo wir welche Funktion & welchen State brauchen 

  
      <div>
       <h1>HolidayBreak</h1>
        <Routes>
        <Route path="/" element={<Home />} />
        {/* jetzt brauchen wir eine Route für AlarmForm um einen neuen Alarm zu erstellen */}
        <Route exact path="/alarm/new" element={<AlarmForm />} />
        <Route exact path="/alarm/:id/edit" element={<AlarmForm />} />
        <Route exact path="/alarm/:id" element={<AlarmItem />} />        
        </Routes>
      </div>
    
  )
}



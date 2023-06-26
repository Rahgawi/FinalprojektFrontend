
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Alarms from './pages/Alarms';
import AlarmForm from './components/Alarmform';

function App() {
  return(
    <div>

<Routes>
        <Route path="/" element={<Alarms />} />
        <Route path="/:id" element={<AlarmForm />} />
        
      
</Routes>
    </div>
  )
}

export default App;

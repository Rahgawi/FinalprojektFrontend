import{BrowserRouter,Route,Link} from 'react-router-dom';
import AlarmForm from '../components/Alarmform';
import AlarmList from '../components/AlarmList';
import AlarmItem from '../components/Alarmitem';




export default function Alarms({setAlarmList}){
    const addAlarmToList = (newAlarm) =>{
        setAlarmList((prevAlarmList) => [...prevAlarmList,newAlarm]);
    };
    
    return (
        <div>

        <div>
        <Link to="/alarm/new">
          <button>+</button>
        </Link>
      </div>
          <BrowserRouter>
            <Route exact path="/alarm/new" component={<AlarmForm addAlarm ={addAlarmToList} setAlarmList={setAlarmList}/>} />
            <Route exact path="/wecker/:id/edit" component={<AlarmForm />} />
            <Route exact path="/wecker/:id" component={<AlarmItem />} />
            <Route path="/" component={< AlarmList/>} />
        
          </BrowserRouter>
        </div>
      );
    };
    

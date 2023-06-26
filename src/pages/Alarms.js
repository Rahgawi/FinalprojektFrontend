import React, {useEffect, useState, NavLink} from 'react';
import AlarmForm from '../components/Alarmform';



export default function Alarms(){
    const [alarmList, setAlarmList] = useState([]);
    const fetchAlarmList = async() => {
       try {
        const res = await fetch('http://localhost:8080/alarm');
        const data = await res.json();
        setAlarmList(data);
       } catch (error) {
         console.log(error);
       }
    };

    useEffect(()=>{
        fetchAlarmList();
    },[]);

    const addAlarm = async() =>{
    try {
        await fetch('http://localhost:8080/alarm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
         
        });
  
        
      } catch (error) {
        console.log(error);
      }
    };
    const deleteAlarm = async(id) =>{
        try {
            await fetch(`http://localhost:8080/alarm/${id}`, {
                method:'DELETE',
            });
            fetchAlarmList();

        } catch (error) {
            console.log(error);
        }
    };

    const toggleAlarm = async (id,isActive)=> {
        try {
            await fetch(`http://localhost:8080/alarm/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: !isActive }),
            });
            fetchAlarmList();
        } catch (error) {
            console.log(error);
        }
    

    return (
        <div>
          <h1>Wecker</h1>
          <AlarmForm fetchAlarmList={fetchAlarmList} />
          <ul>
            {alarmList.map((alarm) => (
              <li key={alarm.id}>
                <span>{alarm.time}</span>
                <span>{alarm.day}</span>
                {/* <span>{alarm.tune}</span>
                <span>{alarm.description}</span> */}
                <button onClick={() => deleteAlarm(alarm.time)}>Delete</button>
                <button onClick={() => toggleAlarm(alarm.time, alarm.isActive)}>
                
                  {alarm.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => addAlarm(alarm.time)}></button>
                <button onClick={ <NavLink className="edit" to="alarms/alarmform">
        </NavLink>}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      );
    

    }
}
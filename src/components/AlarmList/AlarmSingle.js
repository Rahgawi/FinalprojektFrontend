import React from 'react';
import {StateContext} from "../context/stateContext";
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

export default function AlarmSingle() {
  const { hourDigital, minutesDigital, amPm, dayNow, monthNow, yearNow, alarmTime, setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm } = useContext(StateContext);
  const [alarmSingle,setAlarmSingle] = useState([]);
 
  
    // console.log("alarmList",alarmList);
    const fetchsingleAlarm= async() =>{
      try {
          const res = await fetch('http://localhost:5002/alarms/id');
          const data = await res.json();
          setAlarmSingle(data);
      } catch (error) {
          console.log('Error fetching singleAlarm:', error);
      }
    }
    

  

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  

    //get request endpoint "alarm" = get all alarms
   return (
      <div>
      {alarmSingle.map((alarm) => (
         <div key={alarm._id}>
         <span> {formatTime(alarm.time)}
         <p> {alarm.days}</p></span>
         </div>
      ))};
      
      </div>
    
 )
}

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import months from "../../data";
import Sound from "../../mixkit-casino-win-alarm-and-coins-1990.mp3";
const alarm = new Audio(Sound);


// const AlarmContext = createContext();

export const StateContext = createContext({})

export default function StateContextProvider ({ children }) {
  
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [amPm, setAmPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [hasAlarm, setHasAlarm] = useState(false);
  const [slsrms,setAlarms] =useState([]);
  const [alarmList, setAlarmList] = useState([]);



  

  useEffect(() => {
    setInterval(() => {
      let date = new Date();

      let HH = date.getHours(),
        MM = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        ampm;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }

      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;

      setHourDigital(HH);
      setMinutesDigital(MM);
      setAmPm(ampm);
      setDayNow(day);
      setMonthNow(months[month]);
      setYearNow(year);
    }, 1000);
  }, []);
   useEffect(()=>{
    fetchAlarmList();
   },[]);

   const fetchAlarmList = async () => {
    try {
      const res = await fetch("http://localhost:5002/alarms");
      const data = await res.json();
      setAlarmList(data);
    } catch (error) {
      console.log('Error fetching alarm list:', error);
    }
  };

  const toggleAlarm = async (id, isActive) => {
    try {
      await axios.patch(`http://localhost:5002/alarms/${id}`, { isActive });
      fetchAlarmList();
    } catch (error) {
      console.log('Error toggling alarm:', error);
    }
  };


  

  const pauseAlarm = () => {
    alarm.pause();
    setAlarmTime("");
  };

  if (alarmTime === `${hourDigital}:${minutesDigital} ${amPm}`) {
    alarm.play();
    alarm.loop = true;
  }

  return (
    <StateContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        alarmTime,
        setAlarmTime,
        pauseAlarm,
        hasAlarm,
        setHasAlarm,
        alarmList,
        fetchAlarmList,
        toggleAlarm,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}


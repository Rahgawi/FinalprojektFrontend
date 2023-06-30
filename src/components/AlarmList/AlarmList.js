import React from "react";
import { StateContext } from "../context/stateContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AlarmSingle from "./AlarmSingle";
import AlarmOption from "../AlarmOption/AlarmOption";

export default function AlarmList({}) {
  const {
    hourDigital,
    minutesDigital,
    amPm,
    dayNow,
    selectedDays,
    monthNow,
    yearNow,
    alarmTime,
    setAlarmTime,
    pauseAlarm,
    hasAlarm,
    setHasAlarm,
  } = useContext(StateContext);
  const [alarmList, setAlarmList] = useState([]);

  console.log("alarmList", alarmList);

  useEffect(() => {
    fetchAlarmList();
  }, []);

  const fetchAlarmList = async () => {
    try {
      const res = await fetch("http://localhost:5002/alarms");
      const data = await res.json();
      setAlarmList(data);
    } catch (error) {
      console.log("Error fetching alarm list:", error);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  const deleteAlarm = async (id) => {
    try {
      await fetch(`http://localhost:5002/alarms/${id}`, {
        method: "DELETE",
      });
      fetchAlarmList();
    } catch (error) {
      console.log("Error deleting alarm:", error);
    }
  };

  return (
    <div>
      <hr />
      {alarmList.map((alarm) => (
        <div key={alarm._id}>
          <span>
            {" "}
            {alarm.time}
            <p> {alarm.days[0]}</p>
            <button onClick={() => deleteAlarm(alarm._id)}>Löschen</button>
          </span>
        </div>
      ))}
      ;
    </div>
  );
}

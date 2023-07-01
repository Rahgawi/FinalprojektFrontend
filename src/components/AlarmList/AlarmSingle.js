import React, { useContext } from 'react';
import { StateContext } from "../context/stateContext";
import Toggle from 'react-toggle';
import 'react-toggle/style.css';



export default function AlarmSingle({ alarm }) {
  const { toggleAlarm, deleteAlarm } = useContext(StateContext);

  const handleToggle = () => {
    toggleAlarm(alarm._id, !alarm.isActive);
  };

  const handleSwipeLeft = () => {
    toggleAlarm(alarm._id, false);
  };

  const handleSwipeRight = () => {
    toggleAlarm(alarm._id, true);
  };

  const handleDelete = () => {
    deleteAlarm(alarm._id);
  };

  return (
    <div className={`alarm-item ${alarm.isActive ? "active" : "inactive"}`}>
      <span className="alarm-time">{alarm.time}</span>
      <span className="alarm-days">{alarm.days.join(", ")}</span>
      <Toggle
        defaultChecked={alarm.isActive}
        onChange={handleToggle}
        icons={false}
      />
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </div>
  );


  



  
}


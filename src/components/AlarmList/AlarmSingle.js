import React, { useContext } from 'react';
import { StateContext } from "../context/stateContext";
import { Swipeable } from "react-swipeable";
// import "./AlarmSingle.css";

export default function AlarmSingle({ alarm }) {
  const { toggleAlarm, deleteAlarm } = useContext(StateContext);

  const handleToggle = () => {
    toggleAlarm(alarm._id, !alarm.isActive);
  };

  const handleSwipe = (event) => {
    if (event.dir === "Left") {
      toggleAlarm(alarm._id, false);
    } else if (event.dir === "Right") {
      toggleAlarm(alarm._id, true);
    }
  };

  const handleDelete = () => {
    deleteAlarm(alarm._id);
  };

  return (
    <Swipeable onSwiped={handleSwipe} className="alarm-item">
      <div className={`alarm-content ${alarm.isActive ? "active" : "inactive"}`}>
        <div className="alarm-details">
          <span className="alarm-time">{alarm.time}</span>
          <span className="alarm-days">{alarm.days.join(", ")}</span>
        </div>
        <div className="alarm-actions">
          <button onClick={handleToggle} className={`toggle-button ${alarm.isActive ? "active" : ""}`}>
            {alarm.isActive ? "Deactivate" : "Activate"}
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </Swipeable>
  );
}




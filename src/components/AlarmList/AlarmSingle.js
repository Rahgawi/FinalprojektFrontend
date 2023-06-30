import React, { useContext } from 'react';
import { StateContext } from "../context/stateContext";
import { useSwipeable } from "react-swipeable";
// import "./AlarmSingle.css";

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight
  });

  return (
    <div className={`alarm-item ${alarm.isActive ? "active" : "inactive"}`} {...swipeHandlers}>
      <div className="alarm-content">
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
    </div>
  );
}





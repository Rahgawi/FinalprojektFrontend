import React, { useContext } from 'react';
import { StateContext } from '../context/stateContext';

const AlarmList = () => {
  const { alarms } = useContext(StateContext);

  return (
    <div>
      <h2>Alarm List</h2>
      {alarms.map((alarm) => (
        <div key={alarm.id}>
          <p>Time: {alarm.time}</p>
          <p>Days: {alarm.days.join(', ')}</p>
          <p>Description: {alarm.description}</p>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AlarmList;

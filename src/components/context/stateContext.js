
import Sound from "../../mixkit-casino-win-alarm-and-coins-1990.mp3";



import React, { createContext, useState, useEffect } from "react";


 export const StateContext = createContext();

export default function StateContextProvider  ({ children })  {
  const [alarms, setAlarms] = useState([]);
  const [selectedAlarm, setSelectedAlarm] = useState(null);

  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = async () => {
    try {
      const response = await fetch('http://localhost:5002/alarms');
      if (response.ok) {
        const alarmsData = await response.json();
        setAlarms(alarmsData);
      } else {
        throw new Error('Failed to fetch alarms.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createAlarm = async () => {
    try {
      const response = await fetch('http://localhost:5002/alarms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alarms),
      });

      if (response.ok) {
        const createdAlarm = await response.json();
        setAlarms([...alarms, createdAlarm]);
        return createdAlarm;
      } else {
        throw new Error('Failed to create alarm.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const updateAlarm = async (id) => {
    try {
      const response = await fetch(`http://localhost:5002/alarms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      if (response.ok) {
        const updatedAlarmData = await response.json();
        setAlarms((prevAlarms) =>
          prevAlarms.map((alarm) => (alarm._id === updatedAlarmData._id ? updatedAlarmData : alarm))
        );
        return updatedAlarmData;
      } else {
        throw new Error('Failed to update alarm.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAlarm = async (id) => {
    try {
      const response = await fetch(`http://localhost:5002/alarms/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm._id !== id));
      } else {
        throw new Error('Failed to delete alarm.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        alarms,
        selectedAlarm,
        setAlarms,
        setSelectedAlarm,
        fetchAlarms,
        createAlarm,
        updateAlarm,
        deleteAlarm,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};



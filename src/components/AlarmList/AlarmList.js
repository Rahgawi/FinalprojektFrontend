import React from "react";
import { StateContext } from "../context/stateContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AlarmSingle from "./AlarmSingle";
import AlarmOption from "../AlarmOption/AlarmOption";
import { useSwipeable } from 'react-swipeable';

export default function AlarmList({}) {
  const {
    
    alarmList,
     fetchAlarmList
  } = useContext(StateContext);
 

  console.log("alarmList", alarmList);

  useEffect(() => {
    fetchAlarmList();
  }, [fetchAlarmList]);


  
  


  return (
   
    <div className="alarm-list">
      {alarmList.length > 0 ? (
        alarmList.map((alarm) => (
          <AlarmSingle key={alarm._id} alarm={alarm} />
        ))
      ) : (
        <p>No alarms found.</p>
      )}
    </div>
  );
}

import React, { useContext, useState } from "react";
import "./AlarmOption.css";
import { minutesNumber, hourNumber } from "../../func";
import useSelect from "../../hook/useSelect";
import { StateContext } from "../context/stateContext";
import AlarmList from "../AlarmList/AlarmList";

export default function AlarmOption() {
  const [hour, setHour] = useSelect("Hour");
  const [minutes, setMinutes] = useSelect("Minutes");
  const [amPmOption, setAmPmOption] = useSelect("Am-Pm");
  const [selectedDays, setSelectedDays] = useState([]);
  const { alarmTime, setAlarmTime,hourDigital,minutesDigital, pauseAlarm, hasAlarm, setHasAlarm,amPm, dayNow } =
    useContext(StateContext);

  console.log("alarm", alarmTime); // alarmTime mittels post Request an API schicken

  //SEPARATE FUNCTION
  //onChange of input checkbox, setSelectedDays(...prev, e.target.value)

  const addAlarm = async () => {
   
    try {

      const alarm ={
        time: `${hour}:${minutes} ${amPmOption}`,
        days: selectedDays,
        isActive:true,
      }
      await fetch("http://localhost:5002/alarms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alarm),
      });

     
    setAlarmTime(alarm.time);
    setHasAlarm(true);

      console.log("Ausgewählte Tage:", selectedDays);
      
    } catch (error) {
      console.log(error);
      alert("Failed to add alarm.");
    }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, value]);
    } else
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
  };

  // alert('Alarm added successfully!');

  //check the value of the checkbox and if it is true, add it to the array
  //GOAL: add the selected days to the array "selectedDays"
  // const handleCheckboxChange = (e) => {
  //   const selectedDays = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(
  //     (checkbox) => checkbox.value
  //   );
  //   console.log("Ausgewählte Tage:", selectedDays);
  // };

  // const formatTime = (time) => {
  //   const date = new Date(time);
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const amPm = hours >= 12 ? 'PM' : 'AM';
  //   const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  //   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //   return `${formattedHours}:${formattedMinutes} ${amPm}`;
  // };

  const setAlarm = (formatTime) => {
    if (hasAlarm) {
      pauseAlarm();
      setHasAlarm(false);
      return;
    }
    if (
      !hour.includes("Hour") &&
      !minutes.includes("Minutes") &&
      !amPmOption.includes("Am-Pm")
    ) {
      addAlarm();
      //  handleCheckboxChange();
      console.log(alarmTime);
      //hier format checken
      setAlarmTime(`${hour}:${minutes} ${amPmOption}`);
    }
    // };

    // const newAlarm ={
    //   time: alarmTime,
    //   day:dayNow,
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="option-Container">
      <div className={`wrapper-option ${hasAlarm && "disable"}`}>
        <select {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select {...setAmPmOption}>
          <option disabled value="Am-Pm">
            Am/Pm
          </option>
          <option value="AM">Am</option>
          <option value="PM">Pm</option>
        </select>
      </div>
      <br />
      <div>
        {daysOfWeek.map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              checked={selectedDays.includes(day)}
              onChange={handleCheckboxChange}
            />{""}
            {day}
          </label>
        ))}
      </div>

      <br />

      <button
        onClick={setAlarm}
        className={`setAlarm-btn ${hasAlarm && "play"}`}
      >
        {hasAlarm ? "Clear Alarm" : "Set Alarm"}
      </button>
    </div>
  );
}

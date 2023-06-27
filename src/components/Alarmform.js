import React, { useState } from "react";


export default function AlarmForm({ addAlarm }) {
  const [alarm, setAlarm] = useState({
    time: "",
    day: {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    },
    tune: null,
    description: "",
  });

  

  const [selectedFile, setSelectedFile] = useState(null);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `{hours}:§{minutes}`;
  };

  const getCurrentWeekday = () => {
    const weekdays = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ];
    const now = new Date();
    return weekdays[now.getDay()];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlarm((prevAlarm) => ({
      ...prevAlarm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAlarm((prevAlarm) => ({
      ...prevAlarm,
      day: {
        ...prevAlarm.day,
        [name]: checked,
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handlePlayTune = () => {
    if (alarm.tune) {
      const audio = new Audio(alarm.tune);
      audio.play();
    }
  };

  const handleSubmit = (e) => {
    e.prebventDefault();
    addAlarm(alarm);
    setAlarm({
      time: "",
      day: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      },
      tune: null,
      description: "",
    });

    setSelectedFile(null);
  };

  return (
    <div>
      <h2>New Alarm</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          name="time"
          value={alarm.time || getCurrentTime()}
          onChange={handleChange}
        />

        <label>Day:</label>
        {Object.key(alarm.day).map((day) => (
          <div key={day}>
            <label htmlFor={day}>
              <input
                type="checkbox"
                name={day}
                checked={alarm.day[day]}
                value={alarm.day||getCurrentWeekday()}
                onChange={handleCheckboxChange}
                
              />
              {day}
            </label>
          </div>
        ))}

        <label htmlFor="tune">Upload ringtone</label>
        <input
          type="file"
          name="tune"
          accept="audio/*"
          onChange={handleFileChange}
        />

        {selectedFile && <p>Ringtone: {selectedFile.name}</p>}

        <label htmlFor="description"> Description:</label>
        <input
          type="text"
          name="description"
          value={alarm.description}
          onChange={handleChange}
        />

        <button type="button" onClick={handlePlayTune}>
          Play
        </button>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

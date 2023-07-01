import React, { useContext, useState } from 'react';
import { StateContext } from '../context/stateContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';
import 'bootstrap/dist/css/bootstrap.css';

const CreateAlarm = () => {
  const { createAlarm } = useContext(StateContext);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [description, setDescription] = useState('');

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const alarmDay = moment(selectedDay).format('dddd');
    const alarmTime = moment(selectedTime).format('HH:mm');

    createAlarm(alarmTime, [alarmDay], description);
    setSelectedDay(null);
    setSelectedTime(null);
    setDescription('');
  };

  return (
    <div>
      <h2>Create Alarm</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <DatePicker
            selected={selectedDay}
            onChange={handleDayChange}
            dateFormat="EEEE"
            placeholderText="Select day"
          />
        </label>
        <label>
          Time:
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            placeholderText="Select time"
          />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAlarm;

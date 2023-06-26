import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function AlarmItem({alarm, updateAlarm,deleteAlarm}){
const [isEditing,setIsEditing]= useState(false);
const [editedAlarm,setEditedAlarm]=useState(alarm);
const navigate = useNavigate();


const handleToggle = () => {
    const updatedAlarm = {...editedAlarm, active: !editedAlarm.active};
    updateAlarm(alarm._id, updatedAlarm);
    setEditedAlarm(updatedAlarm);
};
const handleDelete = () =>{
    deleteAlarm(alarm._id);

};

const handleEdit = () =>{
    setIsEditing(true);
};

const handleSave = () => {
    updateAlarm(alarm._id, editedAlarm);
    setIsEditing(false);
};

const handleChange =(e) => {
    const {name,value} = e.target;
    setEditedAlarm((prevAlarm) => ({
        ...prevAlarm,
        [name]:value,
    }));
};

const handleEditClick =() =>{
    navigate.push(`/alarm/${alarm._id}/edit`);
};

return (
    <div>
        {isEditing ? (
            <div>

                <input 
                    type="text"
                    name="time"
                    value={editedAlarm.time}
                    onChange={handleChange}
                    />
                
                <input 
                    type="text"
                    name="day"
                    value={editedAlarm.day}
                    onChange={handleChange}
                    />
                
                <input
            type="text"
            name="tune"
            value={editedAlarm.tune}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={editedAlarm.description}
            onChange={handleChange}
          />

            <button onClick={handleSave}>Save</button>
                
            </div>
        ) :   (
                <div>
                     <div>{alarm.time}</div>
          <div>{alarm.day}</div>
          <div>{alarm.tune}</div>
          <div>{alarm.description}</div>
          <button onClick={handleToggle}>
            {alarm.active ? 'aktivate' : 'deactivate'}
          </button>
          <button onClick={handleDelete}>Löschen</button>
          <button onClick={handleEditClick}>Bearbeiten</button>
        </div>
                
        )}
    </div>
    );
};
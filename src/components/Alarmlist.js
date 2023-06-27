import React,{useState,useEffect} from "react";
import AlarmItem from './Alarmitem'


export default function AlarmList() {
    const [alarmList,setAlarmList] = useState([]);

    useEffect(()=>{
        fetchAlarmList();
    }, []);

    const fetchAlarmList = async() =>{
        try {
            const res = await fetch('https://localhost:8080/alarm');
            const data = await res.json();
            setAlarmList(data);
        } catch (error) {
            console.log('Error fetching alarm list:', error);
        }
    };

    const addAlarm = (newAlarm) =>{
        const generatedId = Math.random().toString(36).substr(2,9);
        const updatedAlarmList = [...AlarmList, {id: generatedId, ... newAlarm }];
        setAlarmList(updatedAlarmList);
      };

    const updateAlarm = async (id,updatedAlarm)=>{
        try {
            const res = await fetch(`https://localhost:8080/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(updatedAlarm),
            });
            const data = await res.json();
            setAlarmList((prevAlarmList)=>{
                return prevAlarmList.map((alarm)=>{
                    if(alarm._id ===id){
                        return{...alarm, ...data};
                    }
                    return alarm;
                });
            });
        } catch (error) {
            console.log('Error updating alarm:', error);
        }
    };

    const deleteAlarm = async (id) =>{
        try {
            await fetch(`https://localhost:8080/${id}`, {
                method: 'DELETE',
            });
            setAlarmList((prevAlarmList)=>{
                return prevAlarmList.filter((alarm)=> alarm._id !== id);
            });
        } catch (error) {
            console.log('Error deleting alarm: ', error);
        }
    };


    return(

        <div>
            <h2>Alarms</h2>
            {alarmList.map((alarm)=>(
                <AlarmItem 
                key={alarm._id}
                alarm={alarm}
                updateAlarm={updateAlarm}
                deleteAlarm={deleteAlarm}
                />
            

            ))}
        </div>
    );
};
import AlarmOption from '../components/AlarmOption/AlarmOption';
import AnalogClock from '../components/AnalogClock/AnalogClock';
import DigitalClock from '../components/DigitalClock/DigitalClock';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {StateContext} from "../components/context/stateContext"
import AlarmList from '../components/AlarmList/AlarmList';
import AlarmSingle from '../components/AlarmList/AlarmSingle';




export default function Home (){
  



return(

  <section className="clock container">
  <div className="clock__container grid">
    <div className="clock__content grid">

        <AnalogClock />
        <DigitalClock />
        <AlarmOption />
        <AlarmList />

    </div>


  </div>
</section>

);
}
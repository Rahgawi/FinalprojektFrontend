import AlarmOption from '../components/AlarmOption/AlarmOption';
import AnalogClock from '../components/AnalogClock/AnalogClock';
import ContextAlarm from '../components/context/ContextAlarm';
import DigitalClock from '../components/DigitalClock/DigitalClock';




export default function Home (){

return(

  <section className="clock container">
  <div className="clock__container grid">
    <div className="clock__content grid">
      <ContextAlarm>
        <AnalogClock />
        <DigitalClock />
        <AlarmOption />
      </ContextAlarm>
    </div>
  </div>
</section>

);
}
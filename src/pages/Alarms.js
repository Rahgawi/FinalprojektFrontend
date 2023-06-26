
import AlarmForm from '../components/Alarmform';
import AlarmList from '../components/Alarmlist';
import AlarmItem from '../components/Alarmitem';



export default function Alarms(){
    return (
        <div>
          <Switch>
            <Route exact path="/alarm/new" component={AlarmFormForm} />
            <Route exact path="/wecker/:id/edit" component={AlarmFormForm} />
            <Route exact path="/wecker/:id" component={AlarmItem} />
            <Route path="/" component={AlarmList} />
          </Switch>
        </div>
      );
    };
    
}
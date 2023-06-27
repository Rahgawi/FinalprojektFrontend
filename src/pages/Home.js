import{BrowserRouter,Route,Link} from 'react-router-dom';
import AlarmList from "../components/AlarmList";

export default function Alarms(){

    return (
        <div>

        <div>
        <Link to="/alarm/new">
          <button>+</button>
        </Link>
        <AlarmList/>

      </div>
         
           
         
        </div>
      );
    };
    

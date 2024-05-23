
import './App.module.scss';
import ReservationList from './components/ReservationList';
import Tabs from './components/Tabs';
import CustomerSearch from './components/customerSearch';
import ReservationsContextProvider from './store/reservation-context';

function App() {
  return (
    <ReservationsContextProvider>
    <div className="container">
    <div className="row">
      <div className="col-xs-12">
       <CustomerSearch />
       <Tabs />
       <ReservationList />
      </div>
    </div>
  </div>
  </ReservationsContextProvider>
   );
}

export default App;

// npx create-react-app my-app --template typescript
// npm install sass
// npm install bootstrap@3
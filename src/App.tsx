import "./App.module.scss";
import ReservationList from "./components/ReservationList/ReservationList";
import Tabs from "./components/Tabs/Tabs";
import ReservationsContextProvider from "./store/reservation-context";

import styles from "./App.module.scss";
import SidePanel from "./components/SidePanel/sidePanel";
import Header from "./components/Header/header";

function App() {
  return (
    <ReservationsContextProvider>
      <div className={styles.app}>
        <SidePanel />
        <main className={styles.appMain}>
        <Header />
        <Tabs />
        <ReservationList />
        </main>
      </div>
    </ReservationsContextProvider>
  );
}

export default App;

// npx create-react-app my-app --template typescript
// npm install sass
// npm install bootstrap@3

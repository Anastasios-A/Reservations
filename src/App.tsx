import "./App.module.scss";
import ReservationList from "./components/ReservationList/ReservationList";
import Tabs from "./components/Tabs/Tabs";
import ReservationsContextProvider from "./store/reservation-context";

import styles from "./App.module.scss";
import SidePanel from "./components/SidePanel/sidePanel";
import Header from "./components/Header/header";
import { ThemeProvider } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import DeclineModal from "./components/DeclineModal/DeclineModa";

function App() {
  return (
    <ThemeProvider>
    <ReservationsContextProvider>
      <DeclineModal/>
      <div className={styles.app}>
        <SidePanel />
        <main className={styles.appMain}>
        <Header />
        <Tabs />
        <ReservationList />
        </main>
      </div>
    </ReservationsContextProvider>
    </ThemeProvider>
  );
}

export default App;

// npx create-react-app my-app --template typescript
// npm install sass
// npm install bootstrap@3

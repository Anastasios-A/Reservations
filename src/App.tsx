import SidePanel from "./components/SidePanel/sidePanel";
import Header from "./components/Header/header";
import Tabs from "./components/Tabs/Tabs";
import ReservationList from "./components/ReservationList/ReservationList";
import { initializeIcons } from "@fluentui/react";
import styles from "./App.module.scss";
import { useReservationsContext } from "./store/reservation-context";
import DeclineModal from "./components/DeclineModal/DeclineModal";

export default function App() {
  initializeIcons();
  const isDeclineModalOpen = useReservationsContext().declineModal.modalIsOpen;

  return (


    <div className={styles.app}>
      
      <aside>
      <SidePanel />
      </aside>

      <main className={styles.appMain}>
      {isDeclineModalOpen && <DeclineModal/>}
        <Header />
        <Tabs />
        <ReservationList />
      </main>

    </div>
  );
}

// npx create-react-app my-app --template typescript
// npm install sass
// npm install bootstrap@3
// npm i -D react-router-dom@latest

import "./App.module.scss";
import ReservationList from "./components/ReservationList/ReservationList";
import Tabs from "./components/Tabs/Tabs";
import { useReservationsContext } from "./store/reservation-context";

import styles from "./App.module.scss";
import SidePanel from "./components/SidePanel/sidePanel";
import DeclineModal from "./components/DeclineModal/DeclineModal";
import Header from "./components/Header/header";

function App() {
  const isDeclineModalOpen = useReservationsContext().declineModal.modalIsOpen;

  return (
    <>
      <div className={styles.app}>
        {isDeclineModalOpen && <DeclineModal />}
        <SidePanel />
        <main className={styles.appMain}>
          <Header />
          <Tabs />
          <ReservationList />
        </main>
      </div>
    </>
  );
}

export default App;

// npx create-react-app my-app --template typescript
// npm install sass
// npm install bootstrap@3

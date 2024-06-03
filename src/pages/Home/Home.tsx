import ReservationList from "../../components/ReservationList/ReservationList";
import Tabs from "../../components/Tabs/Tabs";
import Header from "../../components/Header/header";
import styles from "./Home.module.scss";
import DeclineModal from "../../components/DeclineModal/DeclineModal";
import { useReservationsContext } from "../../store/reservation-context";
import { Outlet } from "react-router-dom";

export default function Home() {
  const isDeclineModalOpen = useReservationsContext().declineModal.modalIsOpen;

  return (
    <div className={styles.home}>
      {isDeclineModalOpen && <DeclineModal />}

      <main className={styles.homeMain}>
        <Header />
        <Tabs />
        <ReservationList />
      </main>
    </div>
  );
}

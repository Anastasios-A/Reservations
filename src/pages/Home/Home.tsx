import ReservationList from "../../components/ReservationList/ReservationList";
import Tabs from "../../components/Tabs/Tabs";
import Header from "../../components/Header/header";
import styles from "./Home.module.scss";
import DeclineModal from "../../components/DeclineModal/DeclineModal";
import { useReservationsContext } from "../../store/reservation-context";
import QrReader from "../../components/QrCodeScanner/QrCodeScannerModal";
import { Modal } from "@fluentui/react";
import { useState } from "react";

export default function HomePage() {
  const isDeclineModalOpen = useReservationsContext().declineModal.modalIsOpen;
  const [isQrOpen, setQrOpen] = useState<boolean>(false);
  const [isManualInputOpen, setManualInputOpen] = useState<boolean>(false);

  const onScan = (barcode: string) => {
    console.log("s->", barcode);
    setQrOpen(false);
    setManualInputOpen(true);
  };
  return (
    <div className={styles.home}>
      {isDeclineModalOpen && <DeclineModal />}
      {isQrOpen && (
        <Modal
          isOpen={true}
          //className={styles.wrapper}
          // styles={{ root: styles.wrapper }}
        >
          <QrReader onScan={onScan} onClose={() => setQrOpen(false)} />
          <div className={styles.closeButtonWrapper}>
            <button className={styles.btn} onClick={() => setQrOpen(false)}>
              close scanner
            </button>
          </div>
        </Modal>
      )}
      <main className={styles.homeMain}>
        <Header />
        <Tabs />
        <ReservationList />
        <div className={styles.buttonsWrapper}>
          <button className={styles.btn}>Add manualy</button>
          <button className={styles.btn} onClick={() => setQrOpen(true)}>
            Scan QR
          </button>
        </div>
      </main>
    </div>
  );
}

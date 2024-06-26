import ReservationList from "../../components/ReservationList/ReservationList";
import Tabs from "../../components/Tabs/Tabs";
import Header from "../../components/Header/header";
import styles from "./Home.module.scss";
import DeclineModal from "../../components/DeclineModal/DeclineModal";
import { useReservationsContext } from "../../store/reservation-context";
import QrReader from "../../components/QrCodeScanner/QrCodeScannerModal";
import { Modal, Spinner, SpinnerSize } from "@fluentui/react";
import { useState } from "react";
import ManualInputCoupon from "../../components/ManualInputCoupon/ManualInputCoupon";
import { IStore } from "../../Models/ContextModels";

interface IHomeProps {
  onOpenSideModal: () => void;
}

export default function HomePage(props: IHomeProps) {
  const isDeclineModalOpen: boolean =
    useReservationsContext().declineModal.modalIsOpen;

  const isLoading: boolean = useReservationsContext().isLoading;
  const store: IStore = useReservationsContext().store;

  const [isQrOpen, setQrOpen] = useState<boolean>(false);
  const [couponId, setCouponId] = useState<string>("");

  const onScan = (barcode: string) => {
    console.log("s->", barcode);
    setQrOpen(false);
    setCouponId(barcode);
  };
  return (
    <div className={styles.home}>
      {isDeclineModalOpen && <DeclineModal />}
      {couponId && (
        <ManualInputCoupon
          couponId={couponId}
          onDismiss={() => setCouponId("")}
        />
      )}
      {isQrOpen && (
        <Modal isOpen={true}>
          <QrReader onScan={onScan} onClose={() => setQrOpen(false)} />
          <div className={styles.closeButtonWrapper}>
            <button className={styles.btn} onClick={() => setQrOpen(false)}>
              close scanner
            </button>
          </div>
        </Modal>
      )}
      <main className={styles.homeMain}>
        {isLoading ? (
          <div className={styles.spinner}>
            <Spinner
              size={SpinnerSize.large}
              styles={{ circle: styles.circle }}
            />
          </div>
        ) : (
          <>
            <Header opOpenSideModal={props.onOpenSideModal} />
            <Tabs />
            <ReservationList />
          </>
        )}

        {store?.recomendedMenu && (
          <div className={styles.buttonsWrapper}>
            <button
              className={styles.btn}
              onClick={() => {
                setCouponId("new");
              }}
            >
              Add manualy
            </button>
            <button className={styles.btn} onClick={() => setQrOpen(true)}>
              Scan QR
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

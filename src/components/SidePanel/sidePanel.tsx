import styles from "./sidePanel.module.scss";
import ourLogo from "../../Assets/athensLogo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useReservationsContext } from "../../store/reservation-context";
import { useEffect, useState } from "react";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useAuth } from "../../store/AuthProvider";
import { FontIcon, Modal, Spinner } from "@fluentui/react";

interface ISidePanelProps {
  sideModal: boolean;
  onOpenSideModal: () => void;
}

export default function SidePanel(props: ISidePanelProps) {
  const { storeDetails } = useReservationsContext();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const isLoading: boolean = useReservationsContext().isLoading;

  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isNotLoggedIn = !authContext?.user;
    if (isNotLoggedIn) {
      navigate("/login", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, [authContext?.user, navigate]);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner styles={{ circle: styles.circle }} />
      </div>
    );
  }
  if (!props.sideModal) {
    return (
      <div className={styles.screen}>
        {isSettingsModalOpen && (
          <SettingsModal onDismiss={() => setIsSettingsModalOpen(false)} />
        )}
        <div className={styles.sidePanel}>
          <div className={styles.menuWrapper}>
            <div className={styles.header}>
              <img
                className={styles.logo}
                src={storeDetails.logoUrl}
                alt="Logo"
              />
            </div>
            <div className={styles.menu}>
              <button
                className={styles.sidePanelButtons}
                onClick={() => setIsSettingsModalOpen(true)}
              >
                <FontIcon iconName="Settings" />
                Ρυθμήσες
              </button>
              <button
                className={`${styles.sidePanelButtons} ${styles.logout}`}
                onClick={async () => {
                  authContext?.logout();
                  navigate("/login", { replace: true });
                }}
              >
                <FontIcon iconName="Back" />
                Αποσύνδεση
              </button>
            </div>
            <div className={styles.label}>
              Powered By
              <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
            </div>
          </div>
        </div>

        <main className={styles.mainOutlet}>
          <Outlet />
        </main>
      </div>
    );
  } else {
    return (
      <>
        {isSettingsModalOpen && (
          <SettingsModal onDismiss={() => setIsSettingsModalOpen(false)} />
        )}
        <Modal
          isOpen={true}
          containerClassName={styles.modalWrapper}
          onDismiss={props.onOpenSideModal}
        >
          <div className={styles.menuWrapper}>
            <div className={styles.header}>
              <img
                className={styles.logo}
                src={storeDetails.logoUrl}
                alt="Logo"
              />
            </div>
            <div className={styles.menu}>
              <button
                className={styles.sidePanelButtons}
                onClick={() => setIsSettingsModalOpen(true)}
              >
                <FontIcon iconName="Settings" />
                Ρυθμήσες
              </button>
              <button
                className={`${styles.sidePanelButtons} ${styles.logout}`}
                onClick={async () => {
                  authContext?.logout();
                  navigate("/login", { replace: true });
                }}
              >
                <FontIcon iconName="Back" />
                Αποσύνδεση
              </button>
            </div>
            <div className={styles.label}>
              Powered By
              <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
            </div>
          </div>
        </Modal>
        <main className={styles.mainOutlet}>
          <Outlet />
        </main>
      </>
    );
  }
}

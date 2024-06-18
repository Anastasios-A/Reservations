import styles from "./sidePanel.module.scss";
import ourLogo from "../../Assets/athensLogo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useReservationsContext } from "../../store/reservation-context";
import { useEffect, useState } from "react";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useAuth } from "../../store/AuthProvider";
import { Modal } from "@fluentui/react";

interface ISidePanelProps {
  sideModal: boolean;
  onOpenSideModal: () => void;
}

export default function SidePanel(props: ISidePanelProps) {
  const { storeDetails } = useReservationsContext();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
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

  if (!props.sideModal) {
    return (
      <div className={styles.screen}>
        {isSettingsModalOpen && (
          <SettingsModal onDismiss={() => setIsSettingsModalOpen(false)} />
        )}
        <aside className={styles.sidePanel}>
          <header>
            <img
              className={styles.logo}
              src={storeDetails.logoUrl}
              alt="Logo"
            />
            <div className={styles.label}>
              Powered By
              <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
            </div>
          </header>
          <section className={styles.sectionButtons}>
            <button
              className={styles.sidePanelButtons}
              onClick={() => setIsSettingsModalOpen(true)}
            >
              Ρυθμήσες
            </button>
          </section>

          <footer>
            <button
              className={`${styles.sidePanelButtons} ${styles.logout}`}
              onClick={async () => {
                authContext?.logout();
                navigate("/login", { replace: true });
              }}
            >
              Αποσύνδεση
            </button>
          </footer>
        </aside>

        <main className={styles.mainOutlet}>
          <Outlet />
        </main>
      </div>
    );
  } else {
    return (
      <>
        <Modal
          isOpen={true}
          containerClassName={styles.sidePanelModal}
          onDismiss={props.onOpenSideModal}
        >
          <aside className={styles.sidePanelModal}>
            <div className={styles.headerWrapper}>
              <img
                className={styles.logo}
                src={storeDetails.logoUrl}
                alt="Logo"
              />
              <div className={styles.label}>
                Powered By
                <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
              </div>
            </div>
            <section className={styles.sectionButtons}>
              <button
                className={styles.sidePanelButtons}
                onClick={() => {
                  setIsSettingsModalOpen(true);
                  props.onOpenSideModal();
                }}
              >
                Ρυθμήσες
              </button>
            </section>

            <footer>
              <button
                className={`${styles.sidePanelButtons} ${styles.logout}`}
                onClick={async () => {
                  authContext?.logout();
                  navigate("/login", { replace: true });
                }}
              >
                Αποσύνδεση
              </button>
            </footer>
          </aside>
        </Modal>

        <main className={styles.mainOutlet}>
          <Outlet />
        </main>
      </>
    );
  }
}

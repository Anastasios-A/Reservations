import styles from "./sidePanel.module.scss";
import logo from "../../store/logo.png";

import ourLogo from "../../store/athensLogo.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useReservationsContext } from "../../store/reservation-context";
import { useEffect, useState } from "react";
import SettingsModal from "../SettingsModal/SettingsModal";
import { useAuth } from "../../store/AuthProvider";

export default function SidePanel() {
  const { openCloseDeclineForm, storeDetails } = useReservationsContext();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isNotLogedIn = !authContext?.user;
    console.log(authContext?.user);
    if (isNotLogedIn) {
      navigate("/login", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, [authContext?.user, navigate]);

  return (
    <div className={styles.screen}>
      {isSettingsModalOpen && (
        <SettingsModal onDismiss={() => setIsSettingsModalOpen(false)} />
      )}
      <aside className={styles.sidePanel}>
        <header>
          <img className={styles.logo} src={storeDetails.logoUrl} alt="Logo" />
          <div className={styles.label}>
            Powered By
            <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
          </div>
        </header>
        <section className={styles.sectionButtons}>
          <Link className={styles.sidePanelButtons} to="timeSlots">
            Slots Settings
          </Link>
          <button
            className={styles.sidePanelButtons}
            onClick={() => openCloseDeclineForm(undefined)}
          >
            Decline Tempalte
          </button>
          <button
            className={styles.sidePanelButtons}
            onClick={() => setIsSettingsModalOpen(true)}
          >
            Settings
          </button>
        </section>

        <footer>
          <button
            className={styles.sidePanelButtons + " " + styles.logout}
            onClick={async () => {
              authContext?.logout();
              navigate("/login", { replace: true });
            }}
          >
            Log out
          </button>
        </footer>
      </aside>

      <main className={styles.mainOutlet}>
        <Outlet />
      </main>
    </div>
  );
}

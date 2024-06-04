import styles from "./sidePanel.module.scss";
import logo from "../../store/logo.png";
import ourLogo from "../../store/athensLogo.png";
import { useState } from "react";
import SettingsModal from "../SettingsModal/SettingsModal";

export default function SidePanel() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      {isSettingsModalOpen && (
        <SettingsModal onDismiss={() => setIsSettingsModalOpen(false)} />
      )}
      <aside className={styles.sidePanel}>
        <header>
          <img className={styles.logo} src={logo} alt="Logo" />
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
            Settings
          </button>
        </section>

        <footer>
          <button className={styles.sidePanelButtons + " " + styles.logout}>
            Log out
          </button>
        </footer>
      </aside>


    </>
  );
}

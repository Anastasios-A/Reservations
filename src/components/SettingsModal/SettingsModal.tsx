import { Modal } from "@fluentui/react";
import styles from "./SettingsModal.module.scss";

import TimeSlots from "../../pages/TimeSlots/TimeSlotsl";
import EmailSettings from "../EmailSettings/EmailSettings";

interface ISettingsModalProps {
  onDismiss: () => void;
}

export default function SettingsModal(props: ISettingsModalProps) {
  return (
    <Modal
      isOpen={true}
      containerClassName={styles.container}
      onDismiss={props?.onDismiss}
    >
      <div className={styles.settingsModal}>
        <header>
          <h1>Settings</h1>
          <button>X</button>
        </header>

        <main>
          <div className={styles.timeSlots}>
            <TimeSlots />
          </div>
          <div className={styles.emailSettings}>
            <EmailSettings />
          </div>
        </main>
        
        <footer className={styles.footerButtons}>
          <button className={`${styles.button} ${styles.cancel}`}>
            Ακύρωση
          </button>
          <button className={`${styles.button} ${styles.accept}`}>
            Αποθήκευση
          </button>
        </footer>
      </div>
    </Modal>
  );
}

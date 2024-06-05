import styles from "./SettingsModal.module.scss";
import { useRef } from "react";
import TimeSlots from "../TimeSlots/TimeSlots/TimeSlotsl";
import { ReactNode } from "react";

interface IModalBackDropProps {
  children: ReactNode;
  onDismiss: () => void;
}
interface ISettingsModalProps {
  onDismiss: () => void;
}

export function ModalBackDrop(props: IModalBackDropProps) {
  return (
    <div className={styles.modalBackDrop} onClick={props.onDismiss}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
}

export default function SettingsModal(props: ISettingsModalProps) {
  const subject = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);

  return (
    <ModalBackDrop onDismiss={props.onDismiss}>
      <div className={styles.modal}>
        <header className={styles.settingsHeader}>
          <h1>Settings</h1>
          <hr />
        </header>

        <section>
          <TimeSlots />
        </section>

        <section className={styles.sectionTemplate}>
          <header className={styles.declineModalHeader}>
            <h4>Reservation Cancelation Message</h4>
          
          </header>
          <main className={styles.declineModalMain}>
            <section className={styles.declineModalDetails}>
              <div className={styles.detail}>
                <div className={styles.label}>Subject</div>
                <input
                  id="subject"
                  className={styles.detailInput}
                  type="text"
                  ref={subject}
                />
              </div>
            </section>

            <textarea className={styles.textΑreaModal} ref={message} />
          </main>

          <footer className={styles.footerTempalteModal}>
            <button
              className={styles.footerButtonModal}
              onClick={() => console.log("saveTempalateFunction")}
            >
              Save
            </button>
          </footer>
        </section>
      </div>
    </ModalBackDrop>
  );
}

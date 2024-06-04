import { useRef } from "react";
import {
  useReservationsContext,
} from "../../store/reservation-context";
import styles from "./DeclineModal.module.scss";

interface IDeclineModalProps {}

export default function DeclineModal(props: IDeclineModalProps) {
  const subject = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);

  

  const { openCloseDeclineForm, sendDecline, declineModal, reservations } =
    useReservationsContext();

  const declinedReservationId: string | undefined =
    declineModal.declinedReservationId;

  const declinedReservation: string | undefined = reservations?.find(
    (customer) => customer.id === declinedReservationId
  )?.userEmail;

  return (
    <div className={styles.declineModal}>
      <header className={styles.declineModalHeader}>
        <h5> Reservation Cancelation Message</h5>
        <button onClick={()=>openCloseDeclineForm(undefined)}>x</button>
      </header>

      <main className={styles.declineModalMain}>
        <section className={styles.declineModalDetails}>
          <div className={styles.detail}>
            <div>Recipient </div>
            <input
              id="recipent"
              className={styles.detailInput}
              type="text"
              value={declinedReservation ? declinedReservation : "-----"}
              readOnly
            />
          </div>

          <div className={styles.detail}>
            <div>Subject</div>
            <input
              id="subject"
              className={styles.detailInput}
              type="text"
              ref={subject}
            />
          </div>
        </section>

        <textarea className={styles.textArea} ref={message} />
      </main>
      <footer className={styles.footer}>
        <button
          className={styles.footerButton}
          onClick={() => sendDecline(declinedReservationId, subject.current?.value, message.current?.value)}
        >
          {declinedReservationId ? "Send" : "Save"}
        </button>
      </footer>
    </div>
  );
}

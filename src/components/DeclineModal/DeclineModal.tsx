import { useRef, useState } from "react";
import { useReservationsContext } from "../../store/reservation-context";
import styles from "./DeclineModal.module.scss";

export default function DeclineModal() {
  const { openCloseDeclineForm, sendDecline, declineModal, reservations } =
    useReservationsContext();

  const [subject, setSubject] = useState(
    useReservationsContext().storeDetails.emailSubjectTemplate
  );
  const [message, setMessage] = useState(
    useReservationsContext().storeDetails.emailTextTemplate
  );

  const declinedReservationId: string | undefined =
    declineModal.declinedReservationId;

  const declinedReservation: string | undefined = reservations?.find(
    (customer) => customer.id === declinedReservationId
  )?.userEmail;

  return (
    <div className={styles.declineModal}>
      <header className={styles.declineModalHeader}>
        <h5> Reservation Cancelation Message</h5>
        <button onClick={() => openCloseDeclineForm(undefined)}>x</button>
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
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
        </section>

        <textarea
          className={styles.textArea}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </main>
      <footer className={styles.footer}>
        <button
          className={styles.footerButton}
          onClick={() => {
            sendDecline(declinedReservationId, subject, message);
          }}
        >
          {declinedReservationId ? "Send" : "Save"}
        </button>
      </footer>
    </div>
  );
}

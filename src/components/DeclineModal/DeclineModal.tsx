import {
  ICustomer,
  useReservationsContext,
} from "../../store/reservation-context";
import styles from "./DeclineModal.module.scss";

interface IDeclineModalProps {}

export default function DeclineModal(props: IDeclineModalProps) {
  const { cancelDeclineForm, sendDecline, declineModal, reservations } =
    useReservationsContext();

  const declinedReservationId: number | undefined =
    declineModal.declinedReservationId;

  const declinedReservation: string | undefined = reservations?.find(
    (customer) => customer.id === declinedReservationId
  )?.email;

  return (
    <div className={styles.declineModal}>
      <header className={styles.declineModalHeader}>
        <h5> Reservation Cancelation Message</h5>
        <button onClick={cancelDeclineForm}>x</button>
      </header>

      <main className={styles.declineModalMain}>
        <section className={styles.declineModalDetails}>
          <div className={styles.detail}>
            <div>Recipient </div>
            <input
              id="recipent"
              className={styles.detailInput}
              type="text"
              value={declinedReservation}
            />
          </div>

          <div className={styles.detail}>
            <div>Subject</div>
            <input id="subject" className={styles.detailInput} type="text" />
          </div>
        </section>

        <textarea className={styles.textArea} />
      </main>
      <footer className={styles.footer}>
        <button
          className={styles.footerButton}
          onClick={() => sendDecline(declinedReservationId!)}
        >
          Send
        </button>
      </footer>
    </div>
  );
}

import {
  CustomerStatus,
  ICustomer,
  useReservationsContext,
} from "../../store/reservation-context";

import styles from "./ReservationItem.module.scss";

export default function ReservationItem(props: ICustomer) {
  const { acceptReservation, openDeclineForm } = useReservationsContext();

  return (
    <div className={styles.item}>
      <div className={styles.personalInfo}>
        <div className={styles.name}>{props.name}</div>
        <div>{props.email}</div>
        <div>{props.phone}</div>
      </div>

      <div className={styles.date}>
        {props.date ? props.date.toLocaleString() : "No date available"}
      </div>

      <div className={styles.people}>{props.people} people</div>

      <div
        className={`${styles.status} ${
          props.status === CustomerStatus.Accepted
            ? styles.statusAccepted
            : props.status === CustomerStatus.Declined
            ? styles.statusDeclined
            : props.status === CustomerStatus.Pending
            ? styles.statusPending
            : ""
        }  `}
      >
        {props.status}
      </div>

      <div className={styles.itemButtons}>
        <button
          className={`${styles.action} ${
            props.status === CustomerStatus.Accepted
              ? styles.actionDisabledOff
              : styles.actionAccept
          } `}
          onClick={() => {
            acceptReservation(props.id);
          }}
        >
          Accept
        </button>

        <button
          className={`${styles.action} ${styles.actionDecline} ${
           props.status ===  CustomerStatus.Declined ? styles.actionDisabledOff : ""
          } `}
          onClick={() => openDeclineForm(props.id)}
        >
          {props.status === CustomerStatus.Accepted ? "Cancel" : "Decline"}
        </button>
      </div>
    </div>
  );
}


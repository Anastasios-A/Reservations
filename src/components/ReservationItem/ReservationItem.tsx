import {
  CustomerStatusEnum,
  IReservation,
  useReservationsContext,
} from "../../store/reservation-context";

import styles from "./ReservationItem.module.scss";

export default function ReservationItem(props: IReservation) {
  const { acceptReservation, openDeclineForm } = useReservationsContext();

  return (
    <div className={styles.item}>
      <div className={styles.personalInfo}>
        <div className={styles.name}>{props.userName}</div>
        <div>{props.userEmail}</div>
      </div>

      <div className={styles.date}>
        {props.date ? props.date.toLocaleString() : "No date available"}
      </div>

      <div className={styles.people}>{props.people} people</div>

      <div
        className={`${styles.status} ${
          props.status === CustomerStatusEnum.Accepted
            ? styles.statusAccepted
            : props.status === CustomerStatusEnum.Declined
            ? styles.statusDeclined
            : props.status === CustomerStatusEnum.Pending
            ? styles.statusPending
            : ""
        }  `}
      >
        {props.status}
      </div>

      <div className={styles.itemButtons}>
        <button
          className={`${styles.action} ${
            props.status === CustomerStatusEnum.Accepted
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
           props.status ===  CustomerStatusEnum.Declined ? styles.actionDisabledOff : ""
          } `}
          onClick={() => openDeclineForm(props.id)}
        >
          {props.status === CustomerStatusEnum.Accepted ? "Cancel" : "Decline"}
        </button>
      </div>
    </div>
  );
}


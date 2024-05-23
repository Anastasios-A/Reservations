import {
  ICustomer,
  useReservationsContext,
} from "../../store/reservation-context";

import styles from "./ReservationItem.module.scss"

export default function ReservationItem(props: ICustomer) {
  const { acceptReservation, declineReservation } = useReservationsContext();

  return (
    <div  className={styles.item} >
      <div className={styles.personalInfo}>
        <div className={styles.name} > {props.name}</div>
        <div> {props.email}</div>
        <div> {props.phone}</div>
      </div>

    
      <div className={styles.date}>
        {props.date ? props.date.toLocaleString() : "No date available"}
      </div>

      <div className={styles.people}>
        {props.people} people
      </div>

      <div className={styles.status}>
        {props.status}
      </div>

      <div className={styles.itemButtons}>
        <button
          onClick={() => acceptReservation(props.id)}
        >
          Accept
        </button>
        <button
          onClick={() => declineReservation(props.id)}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

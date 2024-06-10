import {
  ChoosenTab,
  CustomerStatusEnum,
  IReservation,
} from "../../Models/Context Models";
import { useReservationsContext } from "../../store/reservation-context";
import ReservationItem from "../ReservationItem/ReservationItem";
import styles from "./ReservationList.module.scss";

export default function ReservationList() {
  const { reservations, choosenTab, searchedCustomers } =
    useReservationsContext();

  let filteredReservations: IReservation[] = [];

  if (searchedCustomers.length === 0) {
    if (choosenTab === ChoosenTab.All) {
      filteredReservations = reservations;
    } else {
      filteredReservations = reservations.filter(
        (res) => res.status === (choosenTab as unknown as CustomerStatusEnum)
      );
    }
  } else {
    if (choosenTab === ChoosenTab.All) {
      filteredReservations = searchedCustomers;
    } else {
      filteredReservations = searchedCustomers.filter(
        (res) => res.status === (choosenTab as unknown as CustomerStatusEnum)
      );
    }
  }
  return (
    <div className={styles.reservationsList}>
      {filteredReservations.map((res) => (
        <ReservationItem key={res.id} {...res} />
      ))}
    </div>
  );
}

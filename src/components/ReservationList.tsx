import {
  IReservations,
  useReservationsContext,
} from "../store/reservation-context";
import ReservationItem from "./ReservationItem";

export default function ReservationList() {
  const { reservations, choosenTab, searchedCustomers } =
    useReservationsContext();

  let filteredReservations: IReservations = [];

  if (searchedCustomers.length === 0) {
    if (choosenTab === "all") {
      filteredReservations = reservations;
    } else {
      filteredReservations = reservations.filter(
        (res) => res.status === choosenTab
      );
    }
  } else {
    if (choosenTab === "all") {
      filteredReservations = searchedCustomers;
    } else {
      filteredReservations = searchedCustomers.filter(
        (res) => res.status === choosenTab
      );
    }
  }
  return (
    <div className="list-group">
      {filteredReservations.map((res) => (
        <ReservationItem key={res.id} {...res} />
      ))}
    </div>
  );
}

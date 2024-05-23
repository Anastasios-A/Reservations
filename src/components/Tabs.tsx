import ReservationList from "./ReservationList";
import {
  ICustomer,
  IReservations,
  useReservationsContext,
} from "../store/reservation-context";

export default function Tabs() {
  const onChooseTab = useReservationsContext().onChooseTab;
  const choosenTab: string = useReservationsContext().choosenTab;

  const reservations: IReservations =
    useReservationsContext().reservations;

  const reservationsSum = (reservations || []).reduce(
    (a: { pen: number; acc: number; dec: number }, c: ICustomer) => {
      if (c?.status === "pending") {
        a.pen += 1;
      } else if (c.status === "accepted") {
        a.acc += 1;
      } else if (c.status === "declined") {
        a.dec += 1;
      }
      return a;
    },
    { pen: 0, acc: 0, dec: 0 }
  );

  return (
    <div>
      <ul className="nav nav-tabs">
        <li
          role="presentation"
          className={choosenTab === "all" ? "active" : undefined}
        >
          <a className="nav-link active" onClick={() => onChooseTab("all")}>
            All {reservations.length}
          </a>
        </li>
        <li
          role="presentation"
          className={choosenTab === "pending" ? "active" : undefined}
        >
          <a className="nav-link" onClick={() => onChooseTab("pending")}>
            Pending {reservationsSum.pen}
          </a>
        </li>
        <li
          role="presentation"
          className={choosenTab === "accepted" ? "active" : undefined}
        >
          <a className="nav-link" onClick={() => onChooseTab("accepted")}>
            Accepted {reservationsSum.acc}
          </a>
        </li>
        <li
          role="presentation"
          className={choosenTab === "declined" ? "active" : undefined}
        >
          <a className="nav-link" onClick={() => onChooseTab("declined")}>
            Declined {reservationsSum.dec}
          </a>
        </li>
      </ul>
    </div>
  );
}

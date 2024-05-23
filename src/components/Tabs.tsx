import ReservationList from "./ReservationList";
import {
  CustomerStatus,
  ICustomer,
  IReservations,
  useReservationsContext,
} from "../store/reservation-context";

export default function Tabs() {

  interface IReduceAccumulator {
    pending : number;
    accepted : number;
    declined : number;
  }

  const onChooseTab = useReservationsContext().onChooseTab;
  const choosenTab: string = useReservationsContext().choosenTab;

  const reservations: IReservations =
    useReservationsContext().reservations;

  const reservationsSum = (reservations || []).reduce(
    (a: IReduceAccumulator, c: ICustomer) => {
      if (c?.status === CustomerStatus.Pending) {
        a.pending += 1;
      } else if (c.status === CustomerStatus.Accepted) {
        a.accepted += 1;
      } else if (c.status === CustomerStatus.Declined) {
        a.declined += 1;
      }
      return a;
    },
    { pending: 0, accepted: 0, declined: 0 }
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
            Pending {reservationsSum.pending}
          </a>
        </li>
        <li
          role="presentation"
          className={choosenTab === "accepted" ? "active" : undefined}
        >
          <a className="nav-link" onClick={() => onChooseTab("accepted")}>
            Accepted {reservationsSum.accepted}
          </a>
        </li>
        <li
          role="presentation"
          className={choosenTab === "declined" ? "active" : undefined}
        >
          <a className="nav-link" onClick={() => onChooseTab("declined")}>
            Declined {reservationsSum.declined}
          </a>
        </li>
      </ul>
    </div>
  );
}

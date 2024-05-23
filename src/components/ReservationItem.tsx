import { ICustomer, useReservationsContext } from "../store/reservation-context";

export default function ReservationItem(props: ICustomer) {

    const {acceptReservation,declineReservation} = useReservationsContext();

  return (
    <a href="#" className="list-group-item list-group-item-action">

      <div> {props.name}</div>
      <div> {props.email}</div>
      <div> {props.status}</div>

      <div>
        <button className="btn btn-primary" onClick={()=>acceptReservation(props.id)} >Accept</button>
        <button className="btn btn-danger"onClick={()=>declineReservation(props.id)}>Decline</button>
      </div>
    </a>
  );
}

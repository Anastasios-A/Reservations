import { useRef } from "react";
import { useReservationsContext } from "../store/reservation-context";

export default function CustomerSearch() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchCustomerCtx = useReservationsContext().searchCustomer;

  return (
    <input
      type="text"
      placeholder="Search Customer"
      ref={searchInputRef}
      onChange={() => searchCustomerCtx(searchInputRef?.current?.value || "")}
    />
  );
}

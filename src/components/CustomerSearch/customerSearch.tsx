import { useRef } from "react";
import { useReservationsContext } from "../../store/reservation-context";
import styles from './customerSearch.module.scss'

export default function CustomerSearch() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchCustomerCtx = useReservationsContext().searchCustomer;

  return (
    <input
      type="text"
      placeholder="Search Customer"
      ref={searchInputRef}
      className={styles.searchBar}
      onChange={() => searchCustomerCtx(searchInputRef?.current?.value || "")}
    />
  );
}

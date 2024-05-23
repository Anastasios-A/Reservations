import CustomerSearch from "../CustomerSearch/customerSearch";
import styles from "./header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <h2>Reservations</h2>

      <CustomerSearch />
    </header>
  );
}

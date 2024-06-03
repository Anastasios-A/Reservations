import styles from "./sidePanel.module.scss";
import logo from "../../store/logo.png";
import ourLogo from "../../store/athensLogo.png";
import { Outlet, Link } from "react-router-dom";
import { useReservationsContext } from "../../store/reservation-context";

export default function SidePanel() {
  const { openCloseDeclineForm } = useReservationsContext();

  return (
    <div className={styles.screen}>
      <aside className={styles.sidePanel}>
        <header>
          <img className={styles.logo} src={logo} alt="Logo" />
          <div className={styles.label}>
            Powered By
            <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
          </div>
        </header>
        <section className={styles.sectionButtons}>

          <Link className={styles.sidePanelButtons}  to="timeSlots">
            Slots Settings
          </Link>
          <button
            className={styles.sidePanelButtons}
            onClick={() => openCloseDeclineForm(undefined)}
          >
            Decline Tempalte
          </button>
        </section>

        <footer>
          <button className={styles.sidePanelButtons +" "+ styles.logout}>Log out</button>
        </footer>
      </aside>

      <main className={styles.mainOutlet}>
        <Outlet />
      </main>
    </div>
  );
}

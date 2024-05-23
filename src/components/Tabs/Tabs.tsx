import styles from "./Tabs.module.scss";
import {
  ChoosenTab,
  CustomerStatus,
  ICustomer,
  IReservations,
  useReservationsContext,
} from "../../store/reservation-context";

export default function Tabs() {
  interface IReduceAccumulator {
    pending: number;
    accepted: number;
    declined: number;
  }

  const onChooseTab = useReservationsContext().onChooseTab;
  const choosenTab: string = useReservationsContext().choosenTab;

  const reservations: IReservations = useReservationsContext().reservations;

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
    <div className={styles.tabs}>
      <main className={styles.tabButtons}>
        <button className={`${styles.button} ${choosenTab === ChoosenTab.All ? styles.active : ''}`} onClick={() => onChooseTab(ChoosenTab.All)}>
          All <div className={styles.buttonSum}> {reservations.length} </div>
        </button>
  
        <button className={`${styles.button} ${choosenTab === ChoosenTab.Pending ? styles.active : ''}`} onClick={() => onChooseTab(ChoosenTab.Pending)}>
          Pending <div className={styles.buttonSum}> {reservationsSum.pending}</div>
        </button>
  
        <button className={`${styles.button} ${choosenTab === ChoosenTab.Accepted ? styles.active : ''}`} onClick={() => onChooseTab(ChoosenTab.Accepted)}>
          Accepted <div className={styles.buttonSum}>{reservationsSum.accepted}</div>
        </button>
  
        <button className={`${styles.button} ${choosenTab === ChoosenTab.Declined ? styles.active : ''}`} onClick={() => onChooseTab(ChoosenTab.Declined)}>
          Declined <div className={styles.buttonSum}> {reservationsSum.declined}</div>
        </button>
      </main>
    </div>
  );
  
}       


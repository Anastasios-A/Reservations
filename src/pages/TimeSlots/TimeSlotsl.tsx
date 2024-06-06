import { useState } from "react";
import TimeSlotsComponent from "../../components/TimeSlots/TimeSlotsComponent/TimeSlotsComponent";
import styles from "./TimeSlots.module.scss";

export default function TimeSlots() {
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(true);
  // const [isSelectDateVisible, setIsSelectDateVisible] = useState(false);
  const [selectedTimeSlotsForTheDate, setSelectedTimeSlotsForTheDate] =
    useState<number[]>([]);

  const handleTimeSlotChange = (time: number) => {
    setSelectedTimeSlotsForTheDate(
      selectedTimeSlotsForTheDate.find((val: number) => val === time)
        ? selectedTimeSlotsForTheDate.filter((val: number) => val !== time)
        : [...selectedTimeSlotsForTheDate, time]
    );
    setIsSaveButtonVisible(true);
  };

  return (
    <div className={styles.timeslotsContainer}>
      <header className={styles.header}>
        <div className={styles.title}>Time slots</div>
      </header>

      <div className={styles.timeSlotsMain}>
        <TimeSlotsComponent onTimeSlotChange={handleTimeSlotChange} />
      </div>

      <footer className={styles.buttons}>
        {isSaveButtonVisible && (
          <button
            className={styles.action + " " + styles.actionAccept}
            onClick={() => alert("clear changes")}
          >
            Καθαρισμός
          </button>
        )}
      </footer>
    </div>
  );
}

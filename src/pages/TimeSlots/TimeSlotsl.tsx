import { useState } from "react";
import CalendarComponent from "../../components/TimeSlots/CalendarComponent/CalendarComponent";
import TimeSlotsComponent from "../../components/TimeSlots/TimeSlotsComponent/TimeSlotsComponent";
import styles from "./TimeSlots.module.scss";
import { Modal } from "@fluentui/react";

export default function TimeSlots() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(true);
  // const [isSelectDateVisible, setIsSelectDateVisible] = useState(false);
  const [selectedTimeSlotsForTheDate, setSelectedTimeSlotsForTheDate] =
    useState<number[]>([]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    // setIsSelectDateVisible(false);
    setIsSaveButtonVisible(false); // Hide save button when date changes
  };

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
        <h3>Ρυθμίσεις Email</h3></header>


      <main className={styles.timeSlotsMain}>
        <TimeSlotsComponent
          date={selectedDate}
          onTimeSlotChange={handleTimeSlotChange}
        />
      </main>

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

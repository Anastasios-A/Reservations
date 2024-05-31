import { useState } from "react";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import TimeSlotsComponent from "../TimeSlotsComponent/TimeSlotsComponent";
import styles from "./TimeSlotsScreen.module.scss";

export default function TimeSlotsScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(true);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setIsSaveButtonVisible(false); // Hide save button when date changes
  };

  const handleTimeSlotChange = (changed: boolean) => {
    setIsSaveButtonVisible(changed);
  };

  return (
    <div className={styles.availableSlots}>
      <header>
        <h1>Available Slots</h1>
      </header>
      <main className={styles.availableSlotsMain}>
        <section className={styles.calendarContainer}>
          <CalendarComponent onSelectDate={handleSelectDate} />
        </section>
        {selectedDate ? (
          <section className={styles.timeslotsContainer}>
            <TimeSlotsComponent
              date={selectedDate}
              onTimeSlotChange={handleTimeSlotChange}
            />
            <footer className={styles.buttons}>
              <button className={styles.action + " " + styles.actionDecline}>
                Cancel
              </button>

              {isSaveButtonVisible && (
                <button
                  className={styles.action + " " + styles.actionAccept}
                  onClick={() => alert("Save changes")}
                >
                  Save
                </button>
              )}
            </footer>
          </section>
        ) : (
          <h4>Please select a date.</h4>
        )}
      </main>
    </div>
  );
}

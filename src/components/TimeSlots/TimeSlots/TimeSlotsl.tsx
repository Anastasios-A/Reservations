import { useCallback, useRef, useState } from "react";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import TimeSlotsComponent from "../TimeSlotsComponent/TimeSlotsComponent";
import styles from "./TimeSlots.module.scss";
import { Callout, DirectionalHint } from "@fluentui/react";

export default function TimeSlots() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(true);
  const [isSelectDateVisible, setIsSelectDateVisible] = useState(false);

  const buttonRef = useRef(null);
  const setButtonRef = useCallback((node: any) => {
    if (node !== null) {
      buttonRef.current = node;
    }
  }, []);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setIsSelectDateVisible(false);
    setIsSaveButtonVisible(false); // Hide save button when date changes
  };

  const handleTimeSlotChange = (changed: boolean) => {
    setIsSaveButtonVisible(changed);
  };

  return (
    <div className={styles.availableSlots}>
      <header className={styles.timeSlotsHeader}>
        <h4>Available Slots</h4>
      </header>
      <main className={styles.availableSlotsMain}>
        {isSelectDateVisible && (
          <div className={styles.calendarPossition}>
            <CalendarComponent onSelectDate={handleSelectDate} />
          </div>
        )}

        <section className={styles.timeslotsContainer}>
          <TimeSlotsComponent
            date={selectedDate}
            ref={setButtonRef}
            onTimeSlotChange={handleTimeSlotChange}
            onBackAction={() => setIsSelectDateVisible(prevState => !prevState)}
          />
          <footer className={styles.buttons}>
            {/*  <button className={styles.action + " " + styles.actionDecline}>
              Cancel
            </button> */}
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
      </main>
    </div>
  );
}

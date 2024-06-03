import { useCallback, useRef, useState } from "react";
import CalendarComponent from "../../components/TimeSlots/CalendarComponent/CalendarComponent";
import TimeSlotsComponent from "../../components/TimeSlots/TimeSlotsComponent/TimeSlotsComponent";
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
        <h3>Available Slots</h3>
      </header>
      <main className={styles.availableSlotsMain}>
        {isSelectDateVisible && (
          <Callout
            directionalHint={DirectionalHint.rightCenter}
            role="alertdialog"
            target={buttonRef.current}
            styles={{
              root: {
                transform: "translateX(-1px)",
              },
            }}
          >
            <section className={styles.calendarContainer}>
              <CalendarComponent onSelectDate={handleSelectDate} />
            </section>
          </Callout>
        )}

        <section className={styles.timeslotsContainer}>
          <TimeSlotsComponent
            date={selectedDate}
            ref={setButtonRef}
            onTimeSlotChange={handleTimeSlotChange}
            onBackAction={() => setIsSelectDateVisible(true)}
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

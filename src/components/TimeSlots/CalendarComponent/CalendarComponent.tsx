import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarComponent.module.scss";

interface CalendarComponentProps {
  onSelectDate: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onSelectDate,
}) => {
  return (
    <div>
      <footer className={styles.calendarFooter}>
        <input id="day" type="checkbox" className={styles.checkbox} />
        <label htmlFor="day" className={styles.label}>
          For every day
        </label>
      </footer>
      <Calendar onClickDay={onSelectDate} className={styles.calentar} />
    </div>
  );
};

export default CalendarComponent;

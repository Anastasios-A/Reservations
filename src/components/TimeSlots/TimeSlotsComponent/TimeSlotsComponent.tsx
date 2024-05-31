import React, { useState, useEffect } from "react";
import styles from "./TimeSlotsComponent.module.scss";

interface TimeSlotsComponentProps {
  date: Date | null;
  onTimeSlotChange: (changed: boolean) => void;
}

const TimeSlotsComponent: React.FC<TimeSlotsComponentProps> = ({
  date,
  onTimeSlotChange,
}) => {
  const [selectedSlots, setSelectedSlots] = useState<boolean[]>(
    Array(24).fill(false)
  );

  useEffect(() => {
    setSelectedSlots(Array(24).fill(false));
  }, [date]);

  const handleCheckboxChange = (index: number) => {
    const newSelectedSlots = [...selectedSlots];
    newSelectedSlots[index] = !newSelectedSlots[index];
    setSelectedSlots(newSelectedSlots);
    onTimeSlotChange(true);
  };
  return (
    <div className={styles.timeSlotsComp}>
      <h3>{date!.toDateString()}</h3>
      <hr />
      <main className={styles.timeSlots}>
        {Array.from({ length: 24 }, (_, index) => (
          <div className={styles.timeSlot} key={index}>
            <label >
                <input
                  type="checkbox"
                  checked={selectedSlots[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
     
              {` ${" "} ${String(index).padStart(2, "0")}:00 - ${String(
                index + 1
              ).padStart(2, "0")}:00`}
            </label>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TimeSlotsComponent;

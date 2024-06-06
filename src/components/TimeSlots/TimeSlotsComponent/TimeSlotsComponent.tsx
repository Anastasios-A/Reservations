import React, { useState, useEffect } from "react";
import styles from "./TimeSlotsComponent.module.scss";
import { DefaultButton } from "@fluentui/react";

interface TimeSlotsComponentProps {
  date: Date | null;
  onTimeSlotChange: (changed: number) => void;
  // onBackAction: () => void;
}

const TimeSlotsComponent = (props: TimeSlotsComponentProps) => {
  const [selectedSlots, setSelectedSlots] = useState<boolean[]>(
    Array(24).fill(false)
  );

  useEffect(() => {
    setSelectedSlots(Array(24).fill(false));
  }, [props?.date]);

  const handleCheckboxChange = (index: number) => {
    const newSelectedSlots = [...selectedSlots];
    newSelectedSlots[index] = !newSelectedSlots[index];
    setSelectedSlots(newSelectedSlots);
    console.log(index);
    props?.onTimeSlotChange(index);
  };
  return (
    <div className={styles.timeSlotsComp}>
      <main className={styles.timeSlots}>
        {Array.from({ length: 24 }, (_, index) => (
          <div className={styles.timeSlot} key={index}>
            <input
              style={{ width: "29px", height: "29px" }}
              type="checkbox"
              checked={selectedSlots[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <div className={styles.timeSlotText}>
              {`${String(index).padStart(2, "0")}:00`}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TimeSlotsComponent;

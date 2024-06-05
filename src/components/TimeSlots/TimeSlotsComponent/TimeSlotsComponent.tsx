import React, { useState, useEffect } from "react";
import styles from "./TimeSlotsComponent.module.scss";
import { DefaultButton } from "@fluentui/react";

interface TimeSlotsComponentProps {
  date: Date | null;
  onTimeSlotChange: (changed: boolean) => void;
  onBackAction: () => void;
  ref: any;
}

const TimeSlotsComponent: React.FC<TimeSlotsComponentProps> = ({
  date,
  onTimeSlotChange,
  onBackAction,
  ref,
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
      <div className={styles.titleWithBackAction}>
        <h4>{date!.toDateString()}</h4>
        <DefaultButton
          componentRef={ref}
          styles={{ root: { color: "black", position:'relative' } }}
          onClick={() => onBackAction()}
          text="Change date"
        />
      </div>
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
              {` ${" "} ${String(index).padStart(2, "0")}:00 - ${String(
                index + 1
              ).padStart(2, "0")}:00`}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TimeSlotsComponent;

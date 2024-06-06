import { useState, useEffect } from "react";
import styles from "./TimeSlotsComponent.module.scss";

interface TimeSlotsComponentProps {
  onTimeSlotChange: (changed: number) => void;
  slots: number[];
  // onBackAction: () => void;
}

function generateBooleanArray(numbers: number[]): boolean[] {
  const booleanArray = new Array(24).fill(false); // Initialize an array of 24 booleans with all false

  numbers.forEach((num) => {
    if (num >= 0 && num < 24) {
      booleanArray[num] = true; // Set the position corresponding to the number to true
    }
  });

  return booleanArray;
}

const TimeSlotsComponent = (props: TimeSlotsComponentProps) => {
  const [selectedSlots, setSelectedSlots] = useState<boolean[]>(
    Array(24).fill(false)
  );

  useEffect(() => {
    setSelectedSlots(generateBooleanArray(props?.slots));
  }, [props?.slots]);

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

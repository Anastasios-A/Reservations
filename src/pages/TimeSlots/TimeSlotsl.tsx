import { useCallback, useState } from "react";
import TimeSlotsComponent from "../../components/TimeSlots/TimeSlotsComponent/TimeSlotsComponent";
import styles from "./TimeSlots.module.scss";
import { IStoreDetails } from "../../Models/ContextModels";

interface ITimeSlotsProps {
  setShopDetails: React.Dispatch<React.SetStateAction<IStoreDetails>>;
  shopDetails: IStoreDetails;
}

export default function TimeSlots(props: ITimeSlotsProps) {
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(true);
  const [selectedTimeSlotsForTheDate, setSelectedTimeSlotsForTheDate] =
    useState<number[]>(props?.shopDetails?.slots);

  const handleTimeSlotChange = useCallback(
    (time: number) => {
      const newArray: number[] = selectedTimeSlotsForTheDate.find(
        (val: number) => val === time
      )
        ? selectedTimeSlotsForTheDate.filter((val: number) => val !== time)
        : [...selectedTimeSlotsForTheDate, time];
      setSelectedTimeSlotsForTheDate(newArray);
      setIsSaveButtonVisible(true);
      console.log("[[][][][][", newArray);
      props?.setShopDetails({
        ...props?.shopDetails,
        slots: newArray,
      });
    },
    [props, selectedTimeSlotsForTheDate]
  );

  return (
    <div className={styles.timeslotsContainer}>
      <header className={styles.header}>
        <div className={styles.title}>Time slots</div>
      </header>

      <div className={styles.timeSlotsMain}>
        <TimeSlotsComponent
          slots={selectedTimeSlotsForTheDate}
          onTimeSlotChange={handleTimeSlotChange}
        />
      </div>

      <footer className={styles.buttons}>
        {isSaveButtonVisible && (
          <button
            className={styles.action + " " + styles.actionAccept}
            onClick={() => setSelectedTimeSlotsForTheDate([])}
          >
            Καθαρισμός
          </button>
        )}
      </footer>
    </div>
  );
}

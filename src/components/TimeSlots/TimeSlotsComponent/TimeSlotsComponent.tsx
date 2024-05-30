import React, { useState, useEffect } from 'react';

interface TimeSlotsComponentProps {
  date: Date | null;
  onTimeSlotChange: (changed: boolean) => void;
}

const TimeSlotsComponent: React.FC<TimeSlotsComponentProps> = ({ date, onTimeSlotChange }) => {
  const [selectedSlots, setSelectedSlots] = useState<boolean[]>(Array(24).fill(false));

  useEffect(() => {
    setSelectedSlots(Array(24).fill(false));
  }, [date]);

  const handleCheckboxChange = (index: number) => {
    const newSelectedSlots = [...selectedSlots];
    newSelectedSlots[index] = !newSelectedSlots[index];
    setSelectedSlots(newSelectedSlots);
    onTimeSlotChange(true);
  };

  if (!date) {
    return <div>Please select a date.</div>;
  }

  return (
    <div>
      <h3>Time Slots for {date.toDateString()}</h3>
      {Array.from({ length: 24 }, (_, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedSlots[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            {`${String(index).padStart(2, '0')}:00 - ${String(index + 1).padStart(2, '0')}:00`}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotsComponent;

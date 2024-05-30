import { useState } from "react";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import TimeSlotsComponent from "../TimeSlotsComponent/TimeSlotsComponent";

export default function TimeSlotsScreen(){
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);
  
    const handleSelectDate = (date: Date) => {
      setSelectedDate(date);
      setIsSaveButtonVisible(false); // Hide save button when date changes
    };
  
    const handleTimeSlotChange = (changed: boolean) => {
      setIsSaveButtonVisible(changed);
    };

    return (
        <div className="app-container">
        <div className="calendar-container">
          <CalendarComponent onSelectDate={handleSelectDate} />
        </div>
        <div className="timeslots-container">
          <TimeSlotsComponent date={selectedDate} onTimeSlotChange={handleTimeSlotChange} />
          {isSaveButtonVisible && (
            <button className="save-button" onClick={() => alert('Save changes')}>Save</button>
          )}
        </div>
      </div>
      );


}
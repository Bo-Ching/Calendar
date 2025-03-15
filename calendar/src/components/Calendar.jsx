import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const addEvent = (event) => {
    setEvents((prevEvents) => {
      const eventDate = event.startDate;
      return {
        ...prevEvents,
        [eventDate]: [...(prevEvents[eventDate] || []), event],
      }
    })
  }

  return (
    <div className="w-[80%] mx-auto h-[calc(100vh-50px)] flex flex-col bg-white p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onAddEvent={addEvent}
      />
      <CalendarGrid year={currentDate.getFullYear()} month={currentDate.getMonth()} events={events} />
    </div>
  );
};

export default Calendar;

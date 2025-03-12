import React, { useState } from 'react'
import CalendarGrid from './CalendarGrid'
import CalendarHeader from './CalendarHeader';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    }

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    }


  return (
    <div className='w-screen h-[calc(100vh-50px)] flex flex-col bg-white shadow-lg'>
      <CalendarHeader currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
      <CalendarGrid year={currentDate.getFullYear()} month={currentDate.getMonth()} />
    </div>
  )
}

export default Calendar

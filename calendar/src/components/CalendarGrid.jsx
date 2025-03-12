import React from 'react'
import { getMonthDays } from "../util/dateUtils"
import CalendarCell from './CalendarCell'

const CalendarGrid = ({ year, month }) => {
    const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = getMonthDays(year, month);
    const currentMonth = new Date(year, month).getMonth();


    return (
        <div className="grid grid-cols-7 auto-rows-[minmax(0.5rem,auto)] p-4 bg-gray-100 rounded-b-lg h-full">
            {WEEK_DAYS.map((day, idx) => (
                <div key={idx} className="text-center font-bold text-gray-700 flex items-end justify-center pb-1">
                    {day}
                </div>
            ))}

            {days.map((day, idx) => (
                <CalendarCell key={idx} date={day} isCurrentMonth={day.getMonth() === currentMonth} />
            ))}
        </div>
    )
}

export default CalendarGrid

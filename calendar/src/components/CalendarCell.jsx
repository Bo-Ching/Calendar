import React from 'react'
import { format } from "date-fns"

const CalendarCell = ({ date, isCurrentMonth }) => {
    return (
        <div
            className={`p-4 border flex items-center justify-center ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400  min-h-[40px]"
                }`}
        >
            {format(date, "dd")}

        </div >
    );
};

export default CalendarCell

import React from 'react'
import { format } from "date-fns"

const CalendarHeader = ({currentDate, onPrevMonth, onNextMonth}) => {
  return (
    <div className='flex justify-between items-center p-4'>
        <button onClick={onPrevMonth} className='p-2 br-gray-300 rounded'>◀</button>
        <h2 className='text-lg font-semibold'>{format(currentDate, "yyyy年 MM月")}</h2>
        <button onClick={onNextMonth} className='p-2 br-gray-300 rounded'>▶</button>
    </div>
  )
}

export default CalendarHeader

import React from "react";
import { format } from "date-fns";

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
      {/* 左右切換按鈕 */}
      <div className="flex gap-2">
        <button 
          onClick={onPrevMonth} 
          className="w-10 h-10 bg-gray-200 text-gray-700 rounded-md flex items-center justify-center border border-gray-400"
        >
          ◀
        </button>
        <button 
          onClick={onNextMonth} 
          className="w-10 h-10 bg-gray-200 text-gray-700 rounded-md flex items-center justify-center border border-gray-400"
        >
          ▶
        </button>
      </div>

      {/* 當前月份 */}
      <h2 className="text-xl font-semibold text-gray-800">
        {format(currentDate, "MMM yyyy")}
      </h2>

      {/* 右上角 "+" 按鈕 */}
      <button 
        className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default CalendarHeader;

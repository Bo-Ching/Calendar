import React from "react";
import { format } from "date-fns";

const CalendarCell = ({ date, isCurrentMonth }) => {
  return (
    <div
      className={`relative border border-gray-300 p-2 h-full ${
        isCurrentMonth ? "bg-white" : "bg-white text-gray-400"
      }`}
    >
      {/* 日期數字靠左上角 */}
      <span className="absolute top-1 left-2 text-sm font-medium">
        {format(date, "d")}
      </span>
    </div>
  );
};

export default CalendarCell;

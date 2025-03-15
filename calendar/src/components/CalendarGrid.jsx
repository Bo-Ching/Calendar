import React from "react";
import { getMonthDays } from "../util/dateUtils";
import CalendarCell from "./CalendarCell";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({ year, month, events }) => {
  const days = getMonthDays(year, month);
  const currentMonth = new Date(year, month).getMonth();

  // 計算需要的行數（通常是 4, 5 或 6）
  const totalRows = Math.ceil(days.length / 7);

  // 確保 `totalDays` 總是 42 格（6 行 * 7 列）
  const totalDays = [...days];
  while (totalDays.length < 42) {
    totalDays.push(null);
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* 星期標題（確保框線與日期對齊） */}
      <div className="grid grid-cols-7 border border-gray-300 bg-gray-100 text-center text-sm font-medium">
        {WEEK_DAYS.map((day, index) => (
          <div key={index} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* 日期區域（確保總是 6 行） */}
      <div className="grid grid-cols-7 grid-rows-6 w-full h-full flex-grow box-border">
        {totalDays.map((day, index) => {
          // **讓 5 或 6 行的空白格子無框線**
          const isHiddenRow = (totalRows === 4 && index >= 28) || (totalRows === 5 && index >= 35);

          return day ? (
            <CalendarCell key={index} date={day} isCurrentMonth={day.getMonth() === currentMonth} events={events} />
          ) : (
            <div
              key={index}
              className={`h-full ${isHiddenRow ? "bg-transparent border-none" : "border border-gray-300"}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;

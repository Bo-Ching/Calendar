import React, { useState } from "react";
import { format } from "date-fns";
import EventModal from "./EventModal";

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
        {/* 左右切換按鈕 */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              console.log("Prev Month Clicked");
              onPrevMonth && onPrevMonth(); // 確保函式存在
            }}
            className="w-10 h-10 bg-gray-200 text-gray-700 rounded-md flex items-center justify-center border border-gray-400"
          >
            ◀
          </button>
          <button
            onClick={() => {
              console.log("Next Month Clicked");
              onNextMonth && onNextMonth(); // 確保函式存在
            }}
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
          onClick={() => {
            console.log("Open Modal");
            setIsModalOpen(true);
          }}
          className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center"
        >
          +
        </button>
      </div>

      {/* 彈出視窗 */}
      {isModalOpen && <EventModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default CalendarHeader;

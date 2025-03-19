import React, { useState } from "react";
import { format } from "date-fns";
import EventModal from "./EventModal";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"; // 引入左右按鈕圖示
import { FaCirclePlus } from "react-icons/fa6"; // 引入 + 號按鈕

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, onAddEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
        {/* 左右切換按鈕 */}
        <div className="flex gap-2">
          <button
            onClick={onPrevMonth}
            className="text-black rounded-full p-1 hover:text-gray-500 transition duration-200"
          >
            <IoIosArrowDropleftCircle size={40} />
          </button>
          <button
            onClick={onNextMonth}
            className="text-black rounded-full p-1 hover:text-gray-500 transition duration-200"
          >
            <IoIosArrowDroprightCircle size={40} />
          </button>
        </div>

        {/* 當前月份 */}
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentDate, "MMM yyyy")}
        </h2>

        {/* 右上角 "+" 按鈕 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-black rounded-full p-1 hover:text-gray-500 transition duration-200"
        >
          <FaCirclePlus size={40} />
        </button>
      </div>

      {/* 彈出視窗 */}
      {isModalOpen && <EventModal onClose={() => setIsModalOpen(false)} onAddEvent={onAddEvent} />}
    </>
  );
};

export default CalendarHeader;

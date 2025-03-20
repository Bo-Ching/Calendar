import React, { forwardRef } from "react";
import { format, parseISO } from "date-fns";
import { FiEdit, FiTrash2, FiClock } from "react-icons/fi";

// **使用 forwardRef 讓 `CalendarCell` 可以控制 `Popup` 外部點擊**
const EventPopup = forwardRef(({ event, position, onClose, onEdit }, ref) => {
  if (!event) return null;
  console.log("Popup Opened for Event:", event); 

  return (
    <div 
      ref={ref}
      className="fixed z-50 bg-white shadow-lg rounded-lg p-4 w-80 border border-gray-300"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)", // **僅水平置中，不影響 `top`**
        maxWidth: "90vw", // **確保 `Popup` 不會超過螢幕寬度**
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* 右上角的 編輯 & 刪除 按鈕 */}
      <div className="flex justify-end space-x-2">
        <button className="text-gray-500 hover:text-gray-800" onClick={onEdit}>
          <FiEdit size={18} />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* 事件名稱 + 顏色標示 */}
      <div className="flex items-center">
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: event.color }}
        ></div>
        <h2 className="text-lg font-semibold text-gray-900">{event.eventName}</h2>
      </div>

      {/* 事件描述 */}
      <p className="text-gray-600 ml-2">{event.eventDescription}</p>

      {/* 日期 (前面加上 ⏰ 時鐘) */}
      <div className="flex items-center text-gray-500 mt-2">
        <FiClock className="mr-2" />
        <span>
          {format(parseISO(event.startDate), "yyyy-MM-dd")} -{" "}
          {format(parseISO(event.endDate), "yyyy-MM-dd")}
        </span>
      </div>
    </div>
  );
});

export default EventPopup;

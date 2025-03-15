import React, { useState, useEffect } from "react";
import { format, parseISO, isWithinInterval, isSameDay } from "date-fns";

// **全局記錄事件的 Y 位置**
const eventGrid = {};

const CalendarCell = ({ date, isCurrentMonth, events = {} }) => {
  const dateKey = format(date, "yyyy-MM-dd");

  // **找出這一天的事件**
  const dayEvents = Object.values(events).flat().filter(event => {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    return isSameDay(date, start) || isWithinInterval(date, { start, end });
  });

  // **⚠️ 如果沒有事件，直接渲染空白日曆格**
  if (dayEvents.length === 0) {
    return (
      <div className={`relative border border-gray-300 p-0 h-full flex flex-col justify-start
            ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"} box-border`}>
        <span className="absolute top-1 left-2 text-sm font-medium">
          {format(date, "d")}
        </span>
      </div>
    );
  }

  // **使用 useState 來存儲 eventSlots**
  const [eventSlots, setEventSlots] = useState([null, null, null, []]);

  useEffect(() => {
    if (!eventGrid[dateKey]) {
      eventGrid[dateKey] = {};
    }

    const newEventSlots = [null, null, null, []];

    // **遍歷事件並分配 Y 位置**
    dayEvents.forEach(event => {
      // **檢查事件是否已經有指定位置**
      const assignedPosition = Object.keys(eventGrid[dateKey] || {}).find(
        key => eventGrid[dateKey][key] === event.eventName
      );

      let availableIndex = assignedPosition !== undefined ? Number(assignedPosition) : -1;

      // **如果事件還沒被分配位置，則尋找可用位置**
      if (availableIndex === -1) {
        for (let i = 0; i < 3; i++) { // **遍歷 0 ~ 2**
          let allDaysFree = true;

          for (let d = parseISO(event.startDate); d <= parseISO(event.endDate); d.setDate(d.getDate() + 1)) {
            let dayKey = format(d, "yyyy-MM-dd");
            if (eventGrid[dayKey]?.[i]) {
              allDaysFree = false;
              break;
            }
          }

          if (allDaysFree) {
            availableIndex = i;
            break;
          }
        }

        // **如果 0~2 都被占用，則放入位置 3**
        if (availableIndex === -1) {
          availableIndex = 3;
        }

        // **將事件分配到 eventGrid**
        for (let d = parseISO(event.startDate); d <= parseISO(event.endDate); d.setDate(d.getDate() + 1)) {
          let dayKey = format(d, "yyyy-MM-dd");
          if (!eventGrid[dayKey]) {
            eventGrid[dayKey] = {};
          }
          eventGrid[dayKey][availableIndex] = event.eventName;
        }
      }

      // **將事件加入 newEventSlots**
      if (availableIndex < 3) {
        newEventSlots[availableIndex] = { ...event, position: availableIndex };
      } else {
        if (!Array.isArray(newEventSlots[3])) {
          newEventSlots[3] = [];
        }
        newEventSlots[3].push({ ...event, position: 3 });
      }
    });

    setEventSlots([...newEventSlots]);
  }, [events, dateKey]);

  return (
    <div className={`relative border border-gray-300 p-0 h-full flex flex-col justify-start
            ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"} box-border`}>

      {/* 日期數字 (靠左上角) */}
      <span className="absolute top-1 left-2 text-sm font-medium">
        {format(date, "d")}
      </span>

      {/* 事件區域 */}
      <div className="mt-8 flex flex-col gap-[2px] w-full h-[75%] relative overflow-hidden box-border">
        {eventSlots.map((event, index) => {
          if (!event || typeof event !== "object") {
            return null;
          }

          // **確保 eventSlots[3] 正確處理**
          if (index === 3 && (!Array.isArray(eventSlots[3]) || eventSlots[3].length === 0)) {
            return null;
          }

          // **判斷是否是跨日事件**
          const isStart = event.startDate === dateKey;
          const isEnd = event.endDate === dateKey;
          // const isMiddle = !isStart && !isEnd;

          // **決定顯示名稱**
          let displayName = isStart ? event.eventName : ""; // 只在 startDate 顯示名稱
          let isOthers = false;

          if (index === 3) {
            if (Array.isArray(eventSlots[3]) && eventSlots[3].length > 1) {
              displayName = `+ ${eventSlots[3].length} others`;
              isOthers = true;
            } else if (Array.isArray(eventSlots[3]) && eventSlots[3].length === 1) {
              displayName = eventSlots[3][0]?.eventName || "";
            }
          }

          // **確保事件出現在正確的位置**
          const position = (index / 4) * 100;

          return (
            <div
              key={index}
              className={`absolute text-xs px-2 py-1 text-left w-full box-border border-transparent ${
                isOthers ? "bg-gray-300 text-white rounded-lg" : "bg-blue-500 text-white"
              } ${isStart ? "rounded-l-lg" : ""} ${isEnd ? "rounded-r-lg" : ""}`}
              style={{
                top: `${position}%`,
                height: `calc(25% - 2px)`, // **每個事件佔 1/4 的高度**
                width: "100%", // **讓跨日事件填滿**
              }}
            >
              {displayName}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CalendarCell;

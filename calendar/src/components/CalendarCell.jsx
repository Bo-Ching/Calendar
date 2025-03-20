import React, { useState, useEffect, useRef } from "react";
import { format, parseISO, isWithinInterval, isSameDay } from "date-fns";
import EventPopup from "./EventPopup";
import EventModal from "./EventModal";

const eventGrid = {};

const CalendarCell = ({ date, isCurrentMonth, events, onUpdateEvent }) => {

  const dateKey = format(date, "yyyy-MM-dd");

  const dayEvents = Object.values(events).flat().filter(event => {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    return isSameDay(date, start) || isWithinInterval(date, { start, end });
  });

  const [eventSlots, setEventSlots] = useState([null, null, null, []]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);


  useEffect(() => {
    if (!eventGrid[dateKey]) {
      eventGrid[dateKey] = {};
    }

    const newEventSlots = [null, null, null, []];

    dayEvents.forEach(event => {
      const assignedPosition = Object.keys(eventGrid[dateKey] || {}).find(
        key => eventGrid[dateKey][key] === event.eventName
      );

      let availableIndex = assignedPosition !== undefined ? Number(assignedPosition) : -1;

      if (availableIndex === -1) {
        for (let i = 0; i < 3; i++) {
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

        if (availableIndex === -1) {
          availableIndex = 3;
        }

        for (let d = parseISO(event.startDate); d <= parseISO(event.endDate); d.setDate(d.getDate() + 1)) {
          let dayKey = format(d, "yyyy-MM-dd");
          if (!eventGrid[dayKey]) {
            eventGrid[dayKey] = {};
          }
          eventGrid[dayKey][availableIndex] = event.eventName;
        }
      }

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

  const handleEventClick = (event, e) => {
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    console.log("Event Position:", rect.top, rect.left);

    let topPosition = rect.top + window.scrollY - 137; // `Popup` 顯示在事件上方
    let leftPosition = rect.left + window.scrollX + rect.width / 2; // 水平置中

    // **防止 `Popup` 超出畫面**
    const popupWidth = 300; // `Popup` 大約 300px 寬
    const margin = 10; // 最小邊距

    // **確保 `Popup` 不會超出右邊界**
    if (leftPosition + popupWidth / 2 > window.innerWidth - margin) {
      leftPosition = window.innerWidth - popupWidth / 2 - margin;
    }
    // **確保 `Popup` 不會超出左邊界**
    if (leftPosition - popupWidth / 2 < margin) {
      leftPosition = popupWidth / 2 + margin;
    }
    // **確保 `Popup` 不會超出畫面上方**
    if (topPosition < margin) {
      topPosition = rect.bottom + window.scrollY + 10; // 如果上方空間不足，顯示在事件**下方**
    }

    console.log("Popup Position:", topPosition, leftPosition);

    setSelectedEvent({ ...event });
    setPopupPosition({ top: topPosition, left: leftPosition });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setSelectedEvent(null);
      }
    };

    if (selectedEvent) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedEvent]);

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsEditing(true);
  }

  const handleUpdateEvent = (updatedEvent) => {
    console.log("🔍 原本的 events：", events);
    console.log("🔍 events 的型別：", typeof events);
    console.log("🔍 events 是否為陣列：", Array.isArray(events));

    setEvents(prevEvents => {
      const newEvents = { ...prevEvents };
      Object.keys(newEvents).forEach(date => {
        if (newEvents[date].eventName === updatedEvent.eventName) {
          newEvents[date] = updatedEvent;
        }
      });
      return newEvents;
    });

    setIsEditing(false);
    setSelectedEvent(null);
  };
  return (
    <div className={`relative border border-gray-300 p-0 h-full flex flex-col justify-start
            ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"} box-border`}
      onClick={() => setSelectedEvent(null)}>

      <span className="absolute top-1 left-2 text-sm font-medium">
        {format(date, "d")}
      </span>

      <div className="mt-8 flex flex-col gap-[2px] w-full h-[75%] relative overflow-hidden box-border">
        {eventSlots.map((event, index) => {
          if (!event || typeof event !== "object") return null;

          if (index === 3 && (!Array.isArray(eventSlots[3]) || eventSlots[3].length === 0)) return null;

          let displayName = event.eventName;
          let bgColor = event.color || "#3B82F6";

          if (index === 3) {
            if (Array.isArray(eventSlots[3]) && eventSlots[3].length > 1) {
              displayName = `+ ${eventSlots[3].length} others`;
              bgColor = "#6B7280";
            } else if (Array.isArray(eventSlots[3]) && eventSlots[3].length === 1) {
              displayName = eventSlots[3][0]?.eventName || "";
              bgColor = eventSlots[3][0]?.color || "#3B82F6";
            }
          }

          return (
            <div
              key={index}
              className="absolute text-xs px-2 py-1 w-[95%] text-left box-border border-transparent rounded-md"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: `${(index / 4) * 100}%`,
                height: `calc(25% - 2px)`,
                backgroundColor: bgColor,
                color: "white",
              }}
              onClick={(e) => handleEventClick(event, e)}
            >
              {displayName}
            </div>
          );
        })}
      </div>
      {selectedEvent && (
        <EventPopup
          ref={popupRef}
          event={selectedEvent}
          position={popupPosition}
          onClose={() => setSelectedEvent(null)} // 點擊 popup 外部時關閉
          onEdit={() => handleEditEvent(selectedEvent)}
        />
      )}

      {isEditing && (
        <EventModal
          onClose={() => setIsEditing(false)}
          onAddEvent={handleUpdateEvent} // 當作更新事件的方法
          eventData={eventToEdit} // 🔹傳遞當前選取的事件
        />
      )}

    </div>
  );
};

export default CalendarCell;

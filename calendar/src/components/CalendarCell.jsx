import React, { useState, useEffect } from "react";
import { format, parseISO, isWithinInterval, isSameDay } from "date-fns";

const eventGrid = {};

const CalendarCell = ({ date, isCurrentMonth, events = {} }) => {
  const dateKey = format(date, "yyyy-MM-dd");

  const dayEvents = Object.values(events).flat().filter(event => {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    return isSameDay(date, start) || isWithinInterval(date, { start, end });
  });

  const [eventSlots, setEventSlots] = useState([null, null, null, []]);

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

  return (
    <div className={`relative border border-gray-300 p-0 h-full flex flex-col justify-start
            ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"} box-border`}>

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

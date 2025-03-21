import React, { forwardRef } from "react";
import { format } from "date-fns";

const EventListPopup = forwardRef(({ date, events, position, onClose }, ref) => {
  if (!events || events.length === 0) return null;

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-white shadow-lg rounded-lg p-4 w-50 border border-gray-300"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)",
        maxWidth: "90vw",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 className="text-base font-semibold mb-2 text-gray-800">
        {format(date, "yyyy-MM-dd")}
      </h3>
      <div className="flex flex-col gap-2">
        {events.map((event, index) => (
          <div
            key={index}
            className="text-sm px-2 py-1 rounded-md text-white"
            style={{ backgroundColor: event.color || "#3B82F6" }}
          >
            {event.eventName}
          </div>
        ))}
      </div>
    </div>
  );
});

export default EventListPopup;

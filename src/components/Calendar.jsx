import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("events")) || [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: `Event ${events.length + 1}`,
      date: "2025-01-28",
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="calendar-container">
      <button onClick={addEvent}>Add Event</button>
      <div className="calendar">
        {events.map((event) => (
          <Draggable key={event.id}>
            <div className="event" style={{ backgroundColor: event.color }}>
              {event.title}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
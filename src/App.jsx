import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/common/main.css";

// Function to generate a random color for events
const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF3", "#FFD700"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ResourceCalendar = () => {
  // State for storing calendar events, loaded from local storage
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  // State for dark mode toggle, loaded from local storage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const calendarRef = useRef(null);

  // Persist events in local storage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Persist dark mode state and update body class
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Handle new event creation with a random color
  const handleEventSelect = (info) => {
    const note = prompt("Enter your note (use '\\n' for new lines):");
    if (note) {
      const newEvent = {
        id: String(events.length + 1),
        resourceId: info.resource.id,
        title: note, 
        start: info.startStr,
        end: info.endStr || new Date(new Date(info.startStr).getTime() + 3600000).toISOString(), // Default 1-hour duration
        color: getRandomColor(), // Assign a random color
      };
      setEvents([...events, newEvent]);
    }
  };

  // Handle event click for deletion
  const handleEventClick = (info) => {
    if (window.confirm("Do you want to delete this note?")) {
      const updatedEvents = events.filter((event) => event.id !== info.event.id);
      setEvents(updatedEvents);
    }
  };

  // Highlight today's column in the calendar
  const highlightTodayColumn = () => {
    const todayStr = new Date().toISOString().split("T")[0];

    document.querySelectorAll(".fc-col-header-cell").forEach((cell) => {
      cell.style.backgroundColor = "";
      cell.style.color = "";
    });

    document.querySelectorAll(".fc-col-header-cell").forEach((cell) => {
      if (cell.getAttribute("data-date") === todayStr) {
        cell.style.backgroundColor = darkMode ? "#1E40AF" : "#007BFF"; // Blue highlight for today
        cell.style.color = "#FFF";
        cell.style.fontWeight = "bold";
        cell.style.borderRadius = "5px";
        cell.style.padding = "5px";
      }
    });
  };

  // Scroll to today's date when clicking "Today"
  const scrollToToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setTimeout(highlightTodayColumn, 200); // Ensure highlight after navigation
    }
  };

  // Custom event rendering to display multiline notes with color
  const renderEventContent = (eventInfo) => {
    return (
      <div className="p-2 text-sm whitespace-pre-wrap text-white rounded-md" style={{ backgroundColor: eventInfo.event.extendedProps.color }}>
        {eventInfo.event.title}
      </div>
    );
  };

  return (
    <div className={`p-4 min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Dark Mode Toggle & Scroll to Today Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg border border-gray-400"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          onClick={scrollToToday}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Go to Today
        </button>
      </div>

      {/* FullCalendar Component */}
      <FullCalendar
        ref={calendarRef}
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineMonth"
        editable
        selectable // Allow selecting a time slot
        select={handleEventSelect} // Handle date selection for new notes
        eventClick={handleEventClick} // Handle click for deleting notes
        droppable
        eventResizableFromStart
        headerToolbar={{
          right: "prev, today ,next",
          left: "title",
        }}
        resources={[
          { id: "a", title: "Resource A" },
          { id: "b", title: "Resource B" },
          { id: "c", title: "Resource C" },
          { id: "d", title: "Resource D" },
          { id: "e", title: "Resource E" },
          { id: "f", title: "Resource F" },
          { id: "g", title: "Resource G" },
          { id: "h", title: "Resource H" },
          { id: "i", title: "Resource I" },
          { id: "j", title: "Resource J" },
        ]}
        events={events.map((event) => ({
          ...event,
          extendedProps: { color: event.color }, // Store color in event props
        }))}
        height="auto"
        datesSet={() => setTimeout(highlightTodayColumn, 200)}
        eventContent={renderEventContent} // Custom event render for colors
        themeSystem={darkMode ? "darkly" : "standard"}
      />
    </div>
  );
};

export default ResourceCalendar;

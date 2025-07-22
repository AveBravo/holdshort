import React from 'react';

const WeekView = ({ currentDate, events, onDayClick, onEventClick }) => {
  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday", 
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the start of the week (Sunday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Get all days in the current week
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Get events for a specific day and hour
  const getEventsForTimeSlot = (day, hour) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      const eventHour = eventDate.getHours();
      
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear() &&
        eventHour === hour
      );
    });
  };

  const weekDaysData = getWeekDays();

  return (
    <div className="flex flex-col h-full">
      {/* Week header */}
      <div className="grid grid-cols-8 gap-0 border-b border-gray-200 dark:border-gray-700">
        <div className="p-2 text-center font-semibold bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          Time
        </div>
        {weekDaysData.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-center font-semibold bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border-r border-gray-200 dark:border-gray-700 ${index === weekDaysData.length - 1 ? 'border-r-0' : ''}`}
            onClick={() => onDayClick(day.getDate(), true)}
          >
            <div className="text-sm">{weekDays[day.getDay()]}</div>
            <div className={`text-lg ${
              new Date().toDateString() === day.toDateString()
                ? "bg-blue-500 text-white w-8 h-8 rounded-full inline-flex items-center justify-center"
                : ""
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time slots */}
      <div className="flex-1 overflow-y-auto">
        {timeSlots.map((time, timeIndex) => (
          <div key={timeIndex} className="grid grid-cols-8 gap-0 border-b border-gray-100 dark:border-gray-800">
            <div className="p-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-900 text-center border-r border-gray-200 dark:border-gray-700">
              {time}
            </div>
            {weekDaysData.map((day, dayIndex) => {
              const slotEvents = getEventsForTimeSlot(day, timeIndex);
              return (
                <div
                  key={dayIndex}
                  className={`min-h-[60px] p-1 border-r border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${dayIndex === weekDaysData.length - 1 ? 'border-r-0' : ''}`}
                  onClick={() => onDayClick(day.getDate(), true)}
                >
                  {slotEvents.map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 mb-1 rounded truncate"
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderLeft: '3px solid #3b82f6',
                        color: '#1e40af',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick && onEventClick(event);
                      }}
                    >
                      {event.pilot || 'New Event'}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;

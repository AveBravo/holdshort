import React from 'react';

const weekDays = [
  "Sunday",
  "Monday", 
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MonthView = ({ currentDate, events, onDayClick, onEventClick }) => {
  // Helper function to get events for a specific day
  const getEventsForDay = (day) => {
    if (!day.isCurrentMonth) return [];
    
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day.day
    );
    
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === dayDate.getDate() &&
        eventDate.getMonth() === dayDate.getMonth() &&
        eventDate.getFullYear() === dayDate.getFullYear()
      );
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      days.push({
        day: prevMonthLastDay - startingDay + i + 1,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Week day headers */}
      {weekDays.map((day) => (
        <div
          key={day}
          className="bg-gray-100 dark:bg-gray-800 p-2 text-center font-semibold border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0"
        >
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {days.map((day, index) => {
        const dayEvents = getEventsForDay(day);
        return (
          <div
            key={index}
            className={`min-h-[120px] p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-r border-b border-gray-200 dark:border-gray-700 ${
              day.isCurrentMonth
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-50 dark:bg-gray-800 text-gray-400"
            } ${(index + 1) % 7 === 0 ? 'border-r-0' : ''}`}
            onClick={() => onDayClick(day.day, day.isCurrentMonth)}
          >
            <div className="flex justify-between items-start">
              <span
                className={`text-sm ${
                  new Date().getDate() === day.day && day.isCurrentMonth
                    ? "bg-blue-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center"
                    : ""
                }`}
              >
                {day.day}
              </span>
            </div>
            <div className="mt-1 space-y-1 overflow-hidden">
              {dayEvents.slice(0, 2).map(event => (
                <div 
                  key={event.id}
                  className="text-xs p-1 rounded truncate"
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderLeft: '3px solid #3b82f6',
                    color: '#1e40af',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick && onEventClick(event);
                  }}
                >
                  {event.start.getHours().toString().padStart(2, '0')}:
                  {event.start.getMinutes().toString().padStart(2, '0')} 
                  {event.pilot || 'New Event'}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div 
                  className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle view more events
                  }}
                >
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;

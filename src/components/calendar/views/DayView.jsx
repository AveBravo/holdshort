import React from 'react';

const DayView = ({ currentDate, events, onDayClick, onEventClick }) => {
  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  // Get events for a specific hour
  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      const eventHour = eventDate.getHours();
      
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventHour === hour
      );
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Day header */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-center">
          {formatDate(currentDate)}
        </h2>
      </div>

      {/* Time slots */}
      <div className="flex-1 overflow-y-auto">
        {timeSlots.map((time, timeIndex) => {
          const hourEvents = getEventsForHour(timeIndex);
          return (
            <div key={timeIndex} className="flex border-b border-gray-200 dark:border-gray-700">
              <div className="w-20 p-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-900 text-center border-r border-gray-200 dark:border-gray-700">
                {time}
              </div>
              <div
                className="flex-1 min-h-[80px] p-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => onDayClick(currentDate.getDate(), true)}
              >
                {hourEvents.map(event => (
                  <div
                    key={event.id}
                    className="text-sm p-2 mb-2 rounded"
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      borderLeft: '4px solid #3b82f6',
                      color: '#1e40af',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick && onEventClick(event);
                    }}
                  >
                    <div className="font-medium">
                      {event.start.getHours().toString().padStart(2, '0')}:
                      {event.start.getMinutes().toString().padStart(2, '0')} - 
                      {event.end.getHours().toString().padStart(2, '0')}:
                      {event.end.getMinutes().toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs mt-1">
                      {event.pilot || 'New Event'}
                    </div>
                    {event.aircraft && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Aircraft: {event.aircraft}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;

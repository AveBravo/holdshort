import React, { useState, useEffect } from 'react';

const WeekView = ({ currentDate, events, onDayClick, onEventClick }) => {
  // Стан для відстеження поточного часу
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Оновлення поточного часу кожну хвилину
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Оновлення кожну хвилину
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Функція для визначення, чи день відповідає поточному дню
  const isCurrentDay = (day) => {
    return day.getDate() === currentTime.getDate() &&
           day.getMonth() === currentTime.getMonth() &&
           day.getFullYear() === currentTime.getFullYear();
  };
  
  // Функція для розрахунку позиції лінії поточного часу
  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    
    // Висота однієї години в пікселях
    const hourHeight = 40;
    
    // Розрахунок позиції на основі годин та хвилин
    // Для 30-хвилинної точності: 0 хвилин = 0% години, 30 хвилин = 50% години, 60 хвилин = 100% години
    const minutePercentage = minutes / 60;
    
    return (hours * hourHeight) + (minutePercentage * hourHeight);
  };
  // Create time slots for hours
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

  // Get all events for a specific day
  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  // Get events that start in a specific time slot (with hour precision)
  const getEventsStartingInTimeSlot = (day, hour) => {
    return events.filter(event => {
      const eventStart = new Date(event.start);
      const eventStartHour = eventStart.getHours();
      
      return (
        eventStart.getDate() === day.getDate() &&
        eventStart.getMonth() === day.getMonth() &&
        eventStart.getFullYear() === day.getFullYear() &&
        eventStartHour === hour
      );
    });
  };

  // Calculate event height based on duration with 30-minute precision
  const calculateEventHeight = (event) => {
    const startTime = new Date(event.start);
    const endTime = new Date(event.end);
    
    // Calculate duration in minutes
    const durationMinutes = (endTime - startTime) / (1000 * 60);
    
    // Height of each hour cell in pixels
    const heightPerHour = 40;
    
    // Calculate height based on duration (30-minute precision)
    return (durationMinutes / 60) * heightPerHour;
  };

  // Get event style based on duration and start time
  const getEventStyle = (event) => {
    const height = calculateEventHeight(event);
    const startTime = new Date(event.start);
    const endTime = new Date(event.end);
    const durationMinutes = (endTime - startTime) / (1000 * 60);
    const startMinutes = startTime.getMinutes();
    
    // Determine if this is a short event (30 minutes or less)
    const isShortEvent = durationMinutes <= 30;
    
    // Calculate top position based on start minutes (0 for XX:00, 20px for XX:30)
    const topPosition = startMinutes >= 30 ? '20px' : '0';
    
    return {
      backgroundColor: '#fef9c3', // Light yellow background
      borderLeft: '3px solid #eab308', // Yellow border
      color: '#854d0e', // Dark yellow/brown text
      fontSize: isShortEvent ? '0.65rem' : '0.7rem',
      fontWeight: 'bold',
      borderRadius: '4px',
      height: height + 'px',
      position: 'absolute',
      top: topPosition,
      width: 'calc(100% - 8px)', // Full width minus padding
      zIndex: 10,
      overflow: 'hidden'
    };
  };

  const weekDaysData = getWeekDays();

  // Render the calendar grid
  return (
    <div className="flex flex-col h-full">
      {/* Week header */}
      <div className="grid grid-cols-8 gap-0 border-b border-gray-200 dark:border-gray-700" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
        <div className="p-1 text-center font-semibold bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          Time
        </div>
        {weekDaysData.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-center font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border-r border-gray-200 dark:border-gray-700 ${index === weekDaysData.length - 1 ? 'border-r-0' : ''} ${isCurrentDay(day) ? 'bg-blue-200 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700' : 'bg-gray-100 dark:bg-gray-800'}`}
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

      <div className="flex-1 overflow-y-auto relative">
        {weekDaysData.some(day => isCurrentDay(day)) && (
          <div 
            className="absolute left-0 right-0 z-20 pointer-events-none"
            style={{ 
              top: `${getCurrentTimePosition()}px`, 
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <div className="w-[80px] flex justify-end items-center pr-0">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1 border-t-2 border-red-500"></div>
          </div>
        )}
        
        {timeSlots.map((time, timeIndex) => (
          <div key={timeIndex} className="grid grid-cols-8 gap-0 border-b border-gray-100 dark:border-gray-800" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
            <div className="p-1 text-xs text-gray-500 bg-gray-50 dark:bg-gray-900 text-center border-r border-gray-200 dark:border-gray-700">
              {time}
            </div>
            {weekDaysData.map((day, dayIndex) => {
              const slotEvents = getEventsStartingInTimeSlot(day, timeIndex);
              
              return (
                <div
                  key={dayIndex}
                  className={`min-h-[40px] p-0 border-r border-gray-200 dark:border-gray-700 relative ${dayIndex === weekDaysData.length - 1 ? 'border-r-0' : ''} ${isCurrentDay(day) ? 'bg-blue-100/70 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}`}
                >
                  {/* Верхня половина (0 хвилин) */}
                  <div 
                    className="h-1/2 w-full hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      onDayClick(day.getDate(), true, {
                        hour: timeIndex,
                        minute: 0
                      });
                    }}
                  ></div>
                  
                  {/* Горизонтальна лінія розділення */}
                  <div className="absolute left-0 right-0 top-1/2 border-t border-gray-100 dark:border-gray-800 z-0"></div>
                  
                  {/* Нижня половина (30 хвилин) */}
                  <div 
                    className="h-1/2 w-full hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      onDayClick(day.getDate(), true, {
                        hour: timeIndex,
                        minute: 30
                      });
                    }}
                  ></div>
                  {/* Відображення подій */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="grid grid-cols-2 gap-1 h-full p-1">
                      <div className="h-full relative">
                        {slotEvents.filter((_, idx) => idx % 2 === 0).map(event => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded truncate pointer-events-auto"
                            style={getEventStyle(event)}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick && onEventClick(event);
                            }}
                          >
                            <div className="font-medium">
                              {event.start.getHours().toString().padStart(2, '0')}:{event.start.getMinutes().toString().padStart(2, '0')} - 
                              {event.end.getHours().toString().padStart(2, '0')}:{event.end.getMinutes().toString().padStart(2, '0')}
                            </div>
                            {(() => {
                              const startTime = new Date(event.start);
                              const endTime = new Date(event.end);
                              const durationMinutes = (endTime - startTime) / (1000 * 60);
                              const isShortEvent = durationMinutes <= 30;
                              
                              if (!isShortEvent) {
                                return (
                                  <>
                                    <div>{event.pilot || 'New Event'}</div>
                                    {event.instructor && <div className="text-xs opacity-90">{event.instructor}</div>}
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        ))}
                      </div>
                      <div className="h-full relative">
                        {slotEvents.filter((_, idx) => idx % 2 === 1).map(event => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded truncate pointer-events-auto"
                            style={getEventStyle(event)}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick && onEventClick(event);
                            }}
                          >
                            <div className="font-medium">
                              {event.start.getHours().toString().padStart(2, '0')}:{event.start.getMinutes().toString().padStart(2, '0')} - 
                              {event.end.getHours().toString().padStart(2, '0')}:{event.end.getMinutes().toString().padStart(2, '0')}
                            </div>
                            {(() => {
                              const startTime = new Date(event.start);
                              const endTime = new Date(event.end);
                              const durationMinutes = (endTime - startTime) / (1000 * 60);
                              const isShortEvent = durationMinutes <= 30;
                              
                              if (!isShortEvent) {
                                return (
                                  <>
                                    <div>{event.pilot || 'New Event'}</div>
                                    {event.instructor && <div className="text-xs opacity-90">{event.instructor}</div>}
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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

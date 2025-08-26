import React, { useState, useEffect } from 'react';

export default function DayView({ currentDate, events, onDayClick, onEventClick, onEventUpdate, filters }) {
  // Location timezone mapping
  const locationTimezones = {
    'KPAO': 'America/Los_Angeles', // Pacific Time
    'KSQL': 'America/Los_Angeles', // Pacific Time
    'KSJC': 'America/Los_Angeles', // Pacific Time
    'KHWD': 'America/Los_Angeles', // Pacific Time
    'KOAK': 'America/Los_Angeles', // Pacific Time
    'KCCR': 'America/Los_Angeles', // Pacific Time
  };
  const [currentTime, setCurrentTime] = useState(new Date());
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Generate time slots with timezone support
  const getTimeSlots = (timezone = 'America/Los_Angeles') => {
    return Array.from({ length: 24 }, (_, i) => {
      const time = new Date(currentDate);
      time.setHours(i, 0, 0, 0);
      
      // Format time for the specific timezone
      const timeString = time.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      return timeString;
    });
  };

  const timeSlots = getTimeSlots(); // Default timezone

  // Get locations with their resources (aircraft)
  const getLocationResourceStructure = () => {
    // Get filtered locations
    let availableLocations = [];
    if (filters?.locations && filters.locations.size > 0) {
      availableLocations = Array.from(filters.locations);
    } else {
      // Get unique locations from events for the current day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.start);
        return (
          eventDate.getDate() === currentDate.getDate() &&
          eventDate.getMonth() === currentDate.getMonth() &&
          eventDate.getFullYear() === currentDate.getFullYear()
        );
      });
      const locations = [...new Set(dayEvents.map(event => event.location).filter(Boolean))];
      availableLocations = locations.length > 0 ? locations : ['KPAO', 'KSQL'];
    }

    // Build structure with locations and their resources
    return availableLocations.map(location => {
      // Get resources (aircraft) for this location from events or filters
      let locationResources = [];
      
      if (filters?.resources && filters.resources.size > 0) {
        locationResources = Array.from(filters.resources);
      } else {
        // Get unique aircraft from events for this location and day
        const locationEvents = events.filter(event => {
          const eventDate = new Date(event.start);
          return (
            eventDate.getDate() === currentDate.getDate() &&
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear() &&
            event.location === location
          );
        });
        const aircraft = [...new Set(locationEvents.map(event => event.aircraft).filter(Boolean))];
        locationResources = aircraft.length > 0 ? aircraft : ['N123AB', 'N456CD'];
      }

      return {
        location,
        resources: locationResources
      };
    });
  };

  // Get events for a specific hour, location and resource
  const getEventsForHourLocationResource = (hour, location, resource) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      const eventHour = eventDate.getHours();
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventHour === hour &&
        event.location === location &&
        event.aircraft === resource
      );
    });
  };

  // Calculate current time position for the time indicator
  const getCurrentTimePosition = () => {
    const now = new Date();
    const isToday = 
      now.getDate() === currentDate.getDate() &&
      now.getMonth() === currentDate.getMonth() &&
      now.getFullYear() === currentDate.getFullYear();
    
    if (!isToday) return null;
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    // Calculate position in pixels (24 hours * 60px per hour = 1440px total width)
    const pixelPosition = (totalMinutes / (24 * 60)) * (24 * 60); // 24 * 60 = 1440px total width
    
    return pixelPosition;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get event colors based on status
  const getEventColors = (status) => {
    switch (status) {
      case 'Not Started':
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.8)', // Gray
          borderColor: '#9ca3af'
        };
      case 'Waiting':
        return {
          backgroundColor: 'rgba(251, 191, 36, 0.8)', // Yellow/Amber
          borderColor: '#fbbf24'
        };
      case 'In Progress':
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue
          borderColor: '#3b82f6'
        };
      case 'Completed':
        return {
          backgroundColor: 'rgba(34, 197, 94, 0.8)', // Green
          borderColor: '#22c55e'
        };
      // Maintenance categories - all have gray background with colored accents
      case 'Maintenance (Not Started)':
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.8)', // Gray background
          borderColor: '#9ca3af' // Gray accent
        };
      case 'Maintenance In Progress':
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.8)', // Gray background
          borderColor: '#3b82f6' // Blue accent
        };
      case 'Maintenance Completed':
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.8)', // Gray background
          borderColor: '#22c55e' // Green accent
        };
      case 'Maintenance':
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.8)', // Gray background
          borderColor: '#9ca3af' // Gray accent
        };
      default:
        return {
          backgroundColor: 'rgba(156, 163, 175, 0.8)', // Default gray
          borderColor: '#9ca3af'
        };
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, event) => {
    setDraggedEvent(event);
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', event.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetLocation, targetResource, targetHour) => {
    e.preventDefault();
    
    if (!draggedEvent) return;
    
    // Only allow dropping within the same location
    if (draggedEvent.location !== targetLocation) {
      setDraggedEvent(null);
      return;
    }

    // Calculate new start and end times
    const eventDuration = draggedEvent.end.getTime() - draggedEvent.start.getTime();
    const newStart = new Date(currentDate);
    newStart.setHours(targetHour, 0, 0, 0);
    const newEnd = new Date(newStart.getTime() + eventDuration);

    // Update the event
    const updatedEvent = {
      ...draggedEvent,
      start: newStart,
      end: newEnd,
      aircraft: targetResource
    };

    if (onEventUpdate) {
      onEventUpdate(updatedEvent);
    }

    setDraggedEvent(null);
  };

  const handleDragEnd = () => {
    setDraggedEvent(null);
  };

  const locationResourceStructure = getLocationResourceStructure();
  const currentTimePosition = getCurrentTimePosition();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Day header */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-lg font-semibold text-center">
          {formatDate(currentDate)}
        </h2>
      </div>

      {/* Main content container with single scroll */}
      <div className="flex-1 overflow-auto relative">
        <div className="min-w-[1568px] relative"> {/* Fixed minimum width: 128px (location) + 1440px (24 hours) */}
          {/* Time header row (horizontal) */}
          <div className="flex border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky top-0 z-30">
            <div className="w-32 p-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
              <div className="font-semibold">Location</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">Resource</div>
            </div>
            <div className="flex flex-shrink-0">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="w-[60px] p-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0"
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Locations and resources grid */}
          <div className="relative">
            {locationResourceStructure.map((locationData, locationIndex) => (
              <div key={locationData.location}>
                {/* Location header row */}
                <div className="flex border-b-2 border-gray-400 dark:border-gray-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
                  <div className="w-32 p-2 text-sm font-bold text-blue-900 dark:text-blue-100 border-r-2 border-gray-400 dark:border-gray-500 flex flex-col justify-center min-h-[36px] bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 flex-shrink-0">
                    <div className="text-center">{locationData.location}</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 text-center mt-0.5">
                      {locationTimezones[locationData.location] ? 
                        new Date().toLocaleTimeString('en-US', {
                          timeZone: locationTimezones[locationData.location],
                          timeZoneName: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Local Time'
                      }
                    </div>
                  </div>
                  <div className="flex flex-shrink-0">
                    {(locationTimezones[locationData.location] ? 
                      getTimeSlots(locationTimezones[locationData.location]) : 
                      timeSlots
                    ).map((time, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="w-[60px] min-h-[50px] border-r border-gray-300 dark:border-gray-600 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center flex-shrink-0"
                      >
                        <span className="text-xs font-medium text-blue-800 dark:text-blue-200">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources for this location */}
                {locationData.resources.map((resource, resourceIndex) => (
                  <div key={resource} className="flex border-b border-gray-200 dark:border-gray-700">
                    {/* Resource column */}
                    <div className="w-32 p-2 text-xs text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 flex items-center min-h-[60px] bg-white dark:bg-gray-900 flex-shrink-0">
                      <div className="w-full pl-4">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="font-medium">{resource}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time slots for this resource */}
                    <div className="flex flex-shrink-0">
                      {timeSlots.map((time, timeIndex) => {
                        const resourceEvents = getEventsForHourLocationResource(timeIndex, locationData.location, resource);
                        return (
                          <div
                            key={timeIndex}
                            className={`w-[60px] min-h-[60px] p-1 border-r border-gray-200 dark:border-gray-700 relative flex-shrink-0 ${
                              resourceEvents.length === 0 
                                ? 'hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer' 
                                : 'cursor-default'
                            }`}
                            onClick={(e) => {
                              if (resourceEvents.length === 0) {
                                onDayClick(currentDate.getDate(), true);
                              }
                            }}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, locationData.location, resource, timeIndex)}
                          >
                            {resourceEvents.map(event => {
                              const startHour = event.start.getHours();
                              const endHour = event.end.getHours();
                              const startMinutes = event.start.getMinutes();
                              const endMinutes = event.end.getMinutes();
                              const duration = (endHour - startHour) + (endMinutes - startMinutes) / 60;
                              const eventWidth = Math.max(duration * 60, 60); // Width in pixels based on duration
                              const colors = getEventColors(event.status);
                              
                              return (
                                <div
                                  key={event.id}
                                  className={`absolute text-xs p-1 rounded z-20 pointer-events-auto cursor-move ${
                                    draggedEvent?.id === event.id ? 'opacity-50' : ''
                                  }`}
                                  style={{
                                    backgroundColor: colors.backgroundColor,
                                    borderLeft: `3px solid ${colors.borderColor}`,
                                    color: 'white',
                                    width: `${eventWidth}px`,
                                    top: '2px',
                                    left: `${(startMinutes / 60) * 60}px`,
                                    minHeight: '56px',
                                    textShadow: '0px 0px 2px rgba(0, 0, 0, 0.7)',
                                    fontWeight: 'bold'
                                  }}
                                  draggable={true}
                                  onDragStart={(e) => handleDragStart(e, event)}
                                  onDragEnd={handleDragEnd}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEventClick && onEventClick(event);
                                  }}
                                  onMouseEnter={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="font-medium text-xs">
                                    {startHour.toString().padStart(2, '0')}:
                                    {startMinutes.toString().padStart(2, '0')} - 
                                    {endHour.toString().padStart(2, '0')}:
                                    {endMinutes.toString().padStart(2, '0')}
                                  </div>
                                  <div className="text-xs mt-1 truncate">
                                    {event.pilot || 'New Event'}
                                  </div>
                                  {event.instructor && (
                                    <div className="text-xs opacity-90 truncate">
                                      {event.instructor}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
            {/* Continuous current time indicator line */}
            {currentTimePosition !== null && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-40 pointer-events-none"
                style={{
                  left: `${96 + currentTimePosition}px`, // 96px offset for location column
                }}
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

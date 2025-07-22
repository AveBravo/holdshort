import React from 'react';
import { Card, CardBody, Chip } from "@heroui/react";

const StackedView = ({ currentDate, events, onEventClick }) => {
  // Get events for the current week
  const getWeekEvents = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
  };

  // Group events by resource/aircraft
  const groupEventsByResource = (events) => {
    return events.reduce((groups, event) => {
      const resource = event.aircraft || event.resource || 'Unassigned';
      if (!groups[resource]) {
        groups[resource] = [];
      }
      groups[resource].push(event);
      return groups;
    }, {});
  };

  // Sort events by start time
  const sortEventsByTime = (events) => {
    return events.sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  const weekEvents = getWeekEvents();
  const groupedEvents = groupEventsByResource(weekEvents);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventColor = (event) => {
    const status = event.status || 'scheduled';
    const colors = {
      scheduled: 'primary',
      'in-progress': 'warning',
      completed: 'success',
      cancelled: 'danger',
      maintenance: 'secondary'
    };
    return colors[status] || 'default';
  };

  const getWeekRange = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Stacked Resource View</h2>
        <p className="text-gray-600 dark:text-gray-400">{getWeekRange()}</p>
      </div>

      {/* Resource Stacks */}
      <div className="space-y-4">
        {Object.entries(groupedEvents).map(([resource, resourceEvents]) => {
          const sortedEvents = sortEventsByTime(resourceEvents);
          
          return (
            <Card key={resource}>
              <CardBody>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{resource}</h3>
                  <Chip color="primary" size="sm">
                    {sortedEvents.length} flights
                  </Chip>
                </div>
                
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                  
                  {/* Events */}
                  <div className="space-y-3">
                    {sortedEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className="relative flex items-start gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg"
                        onClick={() => onEventClick && onEventClick(event)}
                      >
                        {/* Timeline dot */}
                        <div className="relative z-10 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                        
                        {/* Event content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {formatDate(event.start)} • {formatTime(event.start)} - {formatTime(event.end)}
                            </span>
                            <Chip color={getEventColor(event)} size="sm" variant="flat">
                              {event.status || 'scheduled'}
                            </Chip>
                          </div>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <div>Pilot: {event.pilot || 'Unassigned'}</div>
                            {event.instructor && (
                              <div>Instructor: {event.instructor}</div>
                            )}
                            {event.activityType && (
                              <div>Type: {event.activityType}</div>
                            )}
                            {event.location && (
                              <div>Location: {event.location}</div>
                            )}
                          </div>
                          
                          {event.notes && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                              {event.notes}
                            </div>
                          )}
                        </div>
                        
                        {/* Duration */}
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.round((new Date(event.end) - new Date(event.start)) / (1000 * 60))} min
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {Object.keys(groupedEvents).length === 0 && (
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No flights scheduled for this week
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default StackedView;

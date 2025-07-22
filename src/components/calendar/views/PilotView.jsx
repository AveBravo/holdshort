import React from 'react';
import { Card, CardBody, Chip, Avatar } from "@heroui/react";

const PilotView = ({ currentDate, events, onEventClick }) => {
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

  // Group events by pilot
  const groupEventsByPilot = (events) => {
    return events.reduce((groups, event) => {
      const pilot = event.pilot || 'Unassigned';
      if (!groups[pilot]) {
        groups[pilot] = [];
      }
      groups[pilot].push(event);
      return groups;
    }, {});
  };

  // Calculate pilot statistics
  const calculatePilotStats = (pilotEvents) => {
    const totalFlights = pilotEvents.length;
    const totalHours = pilotEvents.reduce((sum, event) => {
      const duration = (new Date(event.end) - new Date(event.start)) / (1000 * 60 * 60);
      return sum + duration;
    }, 0);
    
    const completedFlights = pilotEvents.filter(e => e.status === 'completed').length;
    const upcomingFlights = pilotEvents.filter(e => new Date(e.start) > new Date()).length;
    
    return {
      totalFlights,
      totalHours: totalHours.toFixed(1),
      completedFlights,
      upcomingFlights
    };
  };

  const weekEvents = getWeekEvents();
  const groupedEvents = groupEventsByPilot(weekEvents);

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

  const getPilotInitials = (pilotName) => {
    if (pilotName === 'Unassigned') return 'UN';
    return pilotName.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Pilot Schedule View</h2>
        <p className="text-gray-600 dark:text-gray-400">{getWeekRange()}</p>
      </div>

      {/* Pilot Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(groupedEvents).map(([pilot, pilotEvents]) => {
          const stats = calculatePilotStats(pilotEvents);
          const sortedEvents = pilotEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
          
          return (
            <Card key={pilot} className="h-fit">
              <CardBody>
                {/* Pilot Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar
                    name={getPilotInitials(pilot)}
                    size="md"
                    color="primary"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{pilot}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{stats.totalFlights} flights</span>
                      <span>{stats.totalHours}h total</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-lg font-bold text-green-600">
                      {stats.completedFlights}
                    </div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-lg font-bold text-blue-600">
                      {stats.upcomingFlights}
                    </div>
                    <div className="text-xs text-gray-500">Upcoming</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-lg font-bold text-purple-600">
                      {stats.totalHours}h
                    </div>
                    <div className="text-xs text-gray-500">Total Hours</div>
                  </div>
                </div>

                {/* Events List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sortedEvents.map(event => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => onEventClick && onEventClick(event)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {formatDate(event.start)} • {formatTime(event.start)} - {formatTime(event.end)}
                          </span>
                          <Chip color={getEventColor(event)} size="sm" variant="flat">
                            {event.status || 'scheduled'}
                          </Chip>
                        </div>
                        
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {event.aircraft && `Aircraft: ${event.aircraft}`}
                          {event.instructor && ` • Instructor: ${event.instructor}`}
                          {event.activityType && ` • ${event.activityType}`}
                        </div>
                        
                        {event.location && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            📍 {event.location}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {Math.round((new Date(event.end) - new Date(event.start)) / (1000 * 60))}m
                      </div>
                    </div>
                  ))}
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

export default PilotView;

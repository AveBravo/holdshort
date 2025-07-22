import React from 'react';
import { Card, CardBody, Chip } from "@heroui/react";

const DispatchView = ({ currentDate, events, onEventClick }) => {
  // Get today's events
  const getTodaysEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  // Group events by status
  const groupEventsByStatus = (events) => {
    return events.reduce((groups, event) => {
      const status = event.status || 'scheduled';
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(event);
      return groups;
    }, {});
  };

  const todaysEvents = getTodaysEvents();
  const groupedEvents = groupEventsByStatus(todaysEvents);

  const statusConfig = {
    scheduled: { color: 'primary', label: 'Scheduled' },
    'in-progress': { color: 'warning', label: 'In Progress' },
    completed: { color: 'success', label: 'Completed' },
    cancelled: { color: 'danger', label: 'Cancelled' },
    maintenance: { color: 'secondary', label: 'Maintenance' }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Dispatch Board</h2>
        <p className="text-gray-600 dark:text-gray-400">{formatDate(currentDate)}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {todaysEvents.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Flights
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {groupedEvents.completed?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {groupedEvents['in-progress']?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              In Progress
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {groupedEvents.maintenance?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Maintenance
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Events by Status */}
      {Object.entries(statusConfig).map(([status, config]) => {
        const statusEvents = groupedEvents[status] || [];
        if (statusEvents.length === 0) return null;

        return (
          <Card key={status}>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{config.label}</h3>
                <Chip color={config.color} size="sm">
                  {statusEvents.length}
                </Chip>
              </div>
              <div className="space-y-2">
                {statusEvents.map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => onEventClick && onEventClick(event)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </span>
                        <Chip color={config.color} size="sm" variant="flat">
                          {config.label}
                        </Chip>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Pilot: {event.pilot || 'Unassigned'}
                        {event.aircraft && ` • Aircraft: ${event.aircraft}`}
                        {event.instructor && ` • Instructor: ${event.instructor}`}
                      </div>
                    </div>
                    <div className="text-right">
                      {event.location && (
                        <div className="text-sm text-gray-500">
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        );
      })}

      {todaysEvents.length === 0 && (
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No flights scheduled for today
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default DispatchView;

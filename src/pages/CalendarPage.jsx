import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
  useDisclosure,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import { addToast } from "@heroui/toast";

import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Home,
  Plus,
} from "lucide-react";
import CreateEventModal from "../components/CreateEventModal";
import CalendarViewRenderer from "../components/calendar/CalendarViewRenderer";
import CalendarFilters from "../components/calendar/CalendarFilters";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const viewOptions = [
  "Month View",
  "Week View",
  "Day View",
  "Stacked View",
  "Dispatch View",
  "Pilot View",
];
// Organization-specific data mapping
const organizationData = {
  "JetSuite": {
    locations: ["KPAO", "KSQL"],
    resources: ["N123AB", "N456CD"],
    pilots: ["John Smith", "Mike Johnson"],
    instructors: ["Jane Doe", "Robert Taylor"]
  },
  "Blue Hawaiian Helicopters": {
    locations: ["KSJC", "KNUQ"],
    resources: ["N789EF", "N012GH"],
    pilots: ["Sarah Wilson", "David Brown"],
    instructors: ["Lisa Anderson", "Mark Davis"]
  },
  "Test Organization": {
    locations: ["KPAO", "KNUQ"],
    resources: ["N321GH", "N654IJ", "N987KL"],
    pilots: ["John Smith", "David Brown"],
    instructors: ["Jane Doe", "Mark Davis"]
  }
};

// Extract all unique values for initial state
const organizations = Object.keys(organizationData);
const locations = [...new Set(organizations.flatMap(org => organizationData[org].locations))];
const resources = [...new Set(organizations.flatMap(org => organizationData[org].resources))];
const pilots = [...new Set(organizations.flatMap(org => organizationData[org].pilots))];
const instructors = [...new Set(organizations.flatMap(org => organizationData[org].instructors))];
const activityTypes = ["Not set", "Training", "Maintenance", "Charter"];

const timezones = [
  { label: "(America, -10:00 HST)", value: "HST" },
  { label: "(America, -09:00 AKST)", value: "AKST" },
  { label: "(America, -08:00 PST)", value: "PST" },
  { label: "(America, -07:00 MST)", value: "MST" },
  { label: "(America, -06:00 CST)", value: "CST" },
  { label: "(America, -05:00 EST)", value: "EST" },
];

export default function CalendarPage() {
  const { view, organization } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentView, setCurrentView] = React.useState(view || "Month View");
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [showMaintenanceEvents, setShowMaintenanceEvents] =
    React.useState(true);
  const [showOnlyMyEvents, setShowOnlyMyEvents] = React.useState(false);
  const [showWaitingList, setShowWaitingList] = React.useState(true);
  const [selectedTimezone, setSelectedTimezone] = React.useState("HST");
  const [selectedLocations, setSelectedLocations] = React.useState([]);
  const [selectedResources, setSelectedResources] = React.useState([]);
  const [selectedPilots, setSelectedPilots] = React.useState([]);
  const [selectedInstructors, setSelectedInstructors] = React.useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = React.useState(new Set());
  
  // Handle organization from URL parameter and apply filtering
  React.useEffect(() => {
    console.log('URL params:', { view, organization });
    console.log('Available organizations:', organizations);
    
    if (organization) {
      // Decode URL parameter (handle spaces and special characters)
      const decodedOrg = decodeURIComponent(organization);
      console.log('Organization from URL (decoded):', decodedOrg);
      
      // Find matching organization (case insensitive)
      // Try exact match first
      let matchingOrg = organizations.find(org => 
        org.toLowerCase() === decodedOrg.toLowerCase()
      );
      
      // If no exact match, try matching with spaces removed
      if (!matchingOrg) {
        matchingOrg = organizations.find(org => 
          org.replace(/\s+/g, '').toLowerCase() === decodedOrg.replace(/\s+/g, '').toLowerCase()
        );
      }
      
      // If still no match, try partial match (URL param is part of org name)
      if (!matchingOrg) {
        matchingOrg = organizations.find(org => 
          org.toLowerCase().includes(decodedOrg.toLowerCase())
        );
      }
      
      // Last resort: check if org name is part of URL param
      if (!matchingOrg) {
        matchingOrg = organizations.find(org => 
          decodedOrg.toLowerCase().includes(org.toLowerCase())
        );
      }
      
      console.log('Matching organization found?', matchingOrg || 'None');
      
      if (matchingOrg) {
        console.log('Setting selected organization to:', matchingOrg);
        
        // Set selected organization
        setSelectedOrganizations(new Set([matchingOrg]));
        
        // Apply filtering based on selected organization
        // Get filtered options for this organization
        const filteredLocations = organizationData[matchingOrg]?.locations || [];
        const filteredResources = organizationData[matchingOrg]?.resources || [];
        const filteredPilots = organizationData[matchingOrg]?.pilots || [];
        const filteredInstructors = organizationData[matchingOrg]?.instructors || [];
        
        console.log('Filtered options for', matchingOrg, ':', {
          locations: filteredLocations,
          resources: filteredResources,
          pilots: filteredPilots,
          instructors: filteredInstructors
        });
        
        // Reset other selections to empty sets
        setSelectedLocations(new Set());
        setSelectedResources(new Set());
        setSelectedPilots(new Set());
        setSelectedInstructors(new Set());
        
        // Trigger filtering of events based on the selected organization
        // This will ensure the calendar is properly filtered when the page loads
      } else {
        console.log('No matching organization found for:', decodedOrg);
      }
    }
  }, [organization, organizations]);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [events, setEvents] = React.useState([
    // Sample events for testing - 2 hour duration
    {
      id: '1',
      pilot: 'John Smith',
      aircraft: 'N123AB',
      instructor: 'Jane Doe',
      start: new Date(2025, 7, 18, 9, 0), // Today at 9:00 AM
      end: new Date(2025, 7, 18, 11, 0), // Today at 11:00 AM
      status: 'Not Started',
      activityType: 'Training',
      location: 'KPAO',
      organization: 'JetSuite'
    },
    // 1 hour duration events
    {
      id: '2',
      pilot: 'Mike Johnson',
      aircraft: 'N456CD',
      start: new Date(2025, 7, 18, 14, 0), // Today at 2:00 PM
      end: new Date(2025, 7, 18, 15, 0), // Today at 3:00 PM
      status: 'In Progress',
      activityType: 'Charter',
      location: 'KSQL',
      organization: 'JetSuite'
    },
    {
      id: '3',
      pilot: 'Sarah Wilson',
      aircraft: 'N789EF',
      instructor: 'Robert Taylor',
      start: new Date(2025, 7, 18, 10, 0), // Today at 10:00 AM
      end: new Date(2025, 7, 18, 11, 0), // Today at 11:00 AM
      status: 'Completed',
      activityType: 'Training',
      location: 'KSJC',
      organization: 'Blue Hawaiian Helicopters'
    },
    // 30 minute duration events
    {
      id: '4',
      pilot: 'David Brown',
      aircraft: 'N012GH',
      start: new Date(2025, 7, 18, 13, 0), // Today at 1:00 PM
      end: new Date(2025, 7, 18, 13, 30), // Today at 1:30 PM
      status: 'Not Started',
      activityType: 'Sightseeing',
      location: 'KNUQ',
      organization: 'Blue Hawaiian Helicopters'
    },
    {
      id: '5',
      pilot: 'John Smith',
      aircraft: 'N321GH',
      instructor: 'Mark Davis',
      start: new Date(2025, 7, 18, 16, 30), // Today at 4:30 PM
      end: new Date(2025, 7, 18, 17, 0), // Today at 5:00 PM
      status: 'Waiting',
      activityType: 'Checkout',
      location: 'KPAO',
      organization: 'Test Organization'
    },
    // Additional events for the same time slots to test horizontal splitting
    {
      id: '6',
      pilot: 'Lisa Anderson',
      aircraft: 'N789EF',
      start: new Date(2025, 7, 18, 10, 0), // Same time as event 3
      end: new Date(2025, 7, 18, 11, 0),
      status: 'Not Started',
      activityType: 'Maintenance',
      location: 'KSJC',
      organization: 'Blue Hawaiian Helicopters'
    },
    {
      id: '7',
      pilot: 'Robert Taylor',
      aircraft: 'N456CD',
      start: new Date(2025, 7, 18, 14, 0), // Same time as event 2
      end: new Date(2025, 7, 18, 15, 0),
      status: 'Waiting',
      activityType: 'Training',
      location: 'KSQL',
      organization: 'JetSuite'
    },
    // 2 hour events for tomorrow
    {
      id: '8',
      pilot: 'Sarah Wilson',
      aircraft: 'N012GH',
      instructor: 'Mark Davis',
      start: new Date(2025, 7, 19, 9, 0), // Tomorrow at 9:00 AM
      end: new Date(2025, 7, 19, 11, 0), // Tomorrow at 11:00 AM
      status: 'Not Started',
      activityType: 'Training',
      location: 'KNUQ',
      organization: 'Blue Hawaiian Helicopters'
    },
    // 30 minute event for yesterday
    {
      id: '9',
      pilot: 'Mike Johnson',
      aircraft: 'N123AB',
      start: new Date(2025, 7, 17, 15, 30), // Yesterday at 3:30 PM
      end: new Date(2025, 7, 17, 16, 0), // Yesterday at 4:00 PM
      status: 'Completed',
      activityType: 'Charter',
      location: 'KPAO',
      organization: 'JetSuite'
    },
    // Additional events with different durations
    {
      id: '10',
      pilot: 'Maintenance Crew',
      aircraft: 'N654IJ',
      start: new Date(2025, 7, 18, 13, 0), // Today at 1:00 PM
      end: new Date(2025, 7, 18, 15, 0), // Today at 3:00 PM (2 hours)
      status: 'Completed',
      activityType: 'Maintenance',
      location: 'KSQL',
      organization: 'Test Organization'
    },
    {
      id: '11',
      pilot: 'Maintenance Crew',
      aircraft: 'N987KL',
      start: new Date(2025, 7, 18, 7, 0), // Today at 7:00 AM
      end: new Date(2025, 7, 18, 9, 0), // Today at 9:00 AM (2 hours)
      status: 'Completed',
      activityType: 'Maintenance',
      location: 'KNUQ',
      organization: 'Test Organization'
    },
    // 30 minute events at the same time slot
    {
      id: '12',
      pilot: 'David Brown',
      aircraft: 'N321GH',
      start: new Date(2025, 7, 18, 11, 30), // Today at 11:30 AM
      end: new Date(2025, 7, 18, 12, 0), // Today at 12:00 PM (30 min)
      status: 'Not Started',
      activityType: 'Checkout',
      location: 'KPAO',
      organization: 'Test Organization'
    },
    {
      id: '13',
      pilot: 'Sarah Wilson',
      aircraft: 'N789EF',
      start: new Date(2025, 7, 18, 11, 30), // Today at 11:30 AM (same time as previous)
      end: new Date(2025, 7, 18, 12, 0), // Today at 12:00 PM (30 min)
      status: 'Waiting',
      activityType: 'Training',
      location: 'KSJC',
      organization: 'Blue Hawaiian Helicopters'
    },
    // 1 hour events
    {
      id: '14',
      pilot: 'John Smith',
      aircraft: 'N123AB',
      instructor: 'Jane Doe',
      start: new Date(2025, 7, 18, 12, 0), // Today at 12:00 PM
      end: new Date(2025, 7, 18, 13, 0), // Today at 1:00 PM (1 hour)
      status: 'Not Started',
      activityType: 'Training',
      location: 'KPAO',
      organization: 'JetSuite'
    },
    {
      id: '15',
      pilot: 'Mike Johnson',
      aircraft: 'N456CD',
      start: new Date(2025, 7, 18, 12, 0), // Today at 12:00 PM (same time as previous)
      end: new Date(2025, 7, 18, 13, 0), // Today at 1:00 PM (1 hour)
      status: 'In Progress',
      activityType: 'Charter',
      location: 'KSQL',
      organization: 'JetSuite'
    }
  ]);

  // Filter events based on selected filters
  const getFilteredEvents = () => {
    return events.filter(event => {
      // Filter by organization if any organizations are selected
      if (selectedOrganizations.size > 0 && (!event.organization || !selectedOrganizations.has(event.organization))) {
        return false;
      }
      
      // Filter by location if any locations are selected
      if (selectedLocations.size > 0 && !selectedLocations.has(event.location)) {
        return false;
      }

      // Filter by resource (aircraft) if any resources are selected
      if (selectedResources.size > 0 && !selectedResources.has(event.aircraft)) {
        return false;
      }

      // Filter by pilot if any pilots are selected
      if (selectedPilots.size > 0 && !selectedPilots.has(event.pilot)) {
        return false;
      }

      // Filter by instructor if any instructors are selected
      if (selectedInstructors.size > 0 && event.instructor && !selectedInstructors.has(event.instructor)) {
        return false;
      }

      // Filter maintenance events if showMaintenanceEvents is false
      if (!showMaintenanceEvents && event.activityType === 'Maintenance') {
        return false;
      }

      return true;
    });
  };

  // Helper function to create a date string in YYYY-MM-DD format
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to create a time string in HH:MM format
  const formatTime = (date) => {
    const d = new Date(date);
    return d.toTimeString().slice(0, 5);
  };

  // Format date for input fields (YYYY-MM-DD)
  const formatDateInput = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format time for input fields (HH:MM)
  const formatTimeInput = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Get events for a specific day
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

  // Get current date and time in local timezone
  const now = new Date();
  now.setMinutes(0, 0, 0); // Round to nearest hour

  const oneHourLater = new Date(now);
  oneHourLater.setHours(now.getHours() + 1);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    let dayCounter = 1;

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

  const formatMonth = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + direction))
    );
  };

  const handleDayClick = (day, isCurrentMonth, timeInfo) => {
    if (!isCurrentMonth) return;

    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    setSelectedDate(clickedDate);
    
    // Якщо передано інформацію про час (з WeekView)
    if (timeInfo && typeof timeInfo.hour === 'number') {
      const time = {
        hour: timeInfo.hour,
        minute: timeInfo.minute || 0
      };
      setSelectedTime(time);
    } else {
      // За замовчуванням встановлюємо 9:00, якщо час не вказано
      setSelectedTime({ hour: 9, minute: 0 });
    }
    
    onOpen();
  };

  const handleCreateEvent = (eventData) => {
    // Create a new event with a unique ID
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      // Combine date and time strings into a single Date object for easier handling
      start: new Date(`${eventData.startDate}T${eventData.startTime}`),
      end: new Date(`${eventData.endDate}T${eventData.endTime}`),
      // Add default status and color
      status: 'scheduled',
      color: '#3b82f6',
      // Ensure pilot name is included
      pilot: eventData.pilot || 'Unassigned',
      // Add created timestamp
      createdAt: new Date().toISOString()
    };
    
    // Add organization to the event based on aircraft
    let eventOrganization = null;
    for (const org of organizations) {
      if (organizationData[org].resources.includes(newEvent.aircraft)) {
        eventOrganization = org;
        break;
      }
    }
    
    // Add the new event to the events array with organization info
    setEvents(prevEvents => [...prevEvents, {
      ...newEvent,
      organization: eventOrganization
    }]);
    
    // Close the modal
    onClose();
  };

  // Handle event click
  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
    // Here you would typically open an event details modal or navigate to event details
  };

  const handleEventUpdate = (updatedEvent) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    
    // Show success toast notification
    const startTime = updatedEvent.start.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const endTime = updatedEvent.end.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    addToast({
      title: "Event Updated Successfully",
      description: `${updatedEvent.pilot || 'Event'} moved to ${updatedEvent.aircraft} (${startTime} - ${endTime})`,
      color: "success",
      duration: 4000,
    });
  };

  // Sync currentView with URL parameter
  React.useEffect(() => {
    if (view) {
      // Convert URL parameter back to view name
      const viewName = view.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Add 'View' suffix only if it doesn't already end with 'View'
      const finalViewName = viewName.endsWith('View') ? viewName : viewName + ' View';
      
      console.log('URL view param:', view, '-> View name:', finalViewName);
      setCurrentView(finalViewName);
    } else {
      setCurrentView('Month View'); // Default view
    }
  }, [view]);

  // Add organization to events
  React.useEffect(() => {
    // Add organization to events
    setEvents(prevEvents => prevEvents.map(event => {
      // Skip if already has organization
      if (event.organization) return event;
      
      // Find organization based on aircraft
      let eventOrganization = null;
      for (const org of organizations) {
        if (organizationData[org].resources.includes(event.aircraft)) {
          eventOrganization = org;
          break;
        }
      }
      return { ...event, organization: eventOrganization };
    }));
  }, []);

  const days = getDaysInMonth(currentDate);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem startContent={<Home className="w-4 h-4" />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbItem startContent={<Calendar className="w-4 h-4" />}>
            Calendar
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <Card className="mb-6">
        <CardBody>
          {/* Calendar Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="light"
                isIconOnly
                onPress={() => navigateMonth(-1)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[200px] text-center">
                {formatMonth(currentDate)}
              </h2>
              <Button
                variant="light"
                isIconOnly
                onPress={() => navigateMonth(1)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ButtonGroup>
                {viewOptions.map((viewOption) => (
                  <Button
                    key={viewOption}
                    size="sm"
                    variant={viewOption === currentView ? "solid" : "bordered"}
                    color={viewOption === currentView ? "primary" : "default"}
                    onPress={() => {
                      // Update URL - the useEffect will handle updating currentView
                      const viewParam = viewOption.toLowerCase().replace(/ /g, "-");
                      const newUrl = `/calendar/${viewParam}/${organization || "default-org"}`;
                      console.log('Button clicked:', viewOption, '-> URL param:', viewParam, '-> URL:', newUrl);
                      navigate(newUrl);
                    }}
                  >
                    {viewOption}
                  </Button>
                ))}
              </ButtonGroup>

              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={onOpen}
              >
                Create event
              </Button>
            </div>
          </div>

          {/* Filters */}
          <CalendarFilters
            selectedTimezone={selectedTimezone}
            setSelectedTimezone={setSelectedTimezone}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            selectedResources={selectedResources}
            setSelectedResources={setSelectedResources}
            selectedPilots={selectedPilots}
            setSelectedPilots={setSelectedPilots}
            selectedInstructors={selectedInstructors}
            setSelectedInstructors={setSelectedInstructors}
            selectedOrganizations={selectedOrganizations}
            setSelectedOrganizations={setSelectedOrganizations}
            showMaintenanceEvents={showMaintenanceEvents}
            setShowMaintenanceEvents={setShowMaintenanceEvents}
            showOnlyMyEvents={showOnlyMyEvents}
            setShowOnlyMyEvents={setShowOnlyMyEvents}
            showWaitingList={showWaitingList}
            setShowWaitingList={setShowWaitingList}
            timezones={timezones}
            locations={locations}
            resources={resources}
            pilots={pilots}
            instructors={instructors}
            organizations={organizations}
            organizationData={organizationData}
            onFilter={() => setFilteredEvents(getFilteredEvents())}
          />

          {/* Calendar View Renderer */}
          <CalendarViewRenderer
            view={currentView}
            currentDate={currentDate}
            events={getFilteredEvents()}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
            onEventUpdate={handleEventUpdate}
            filters={{
              timezone: selectedTimezone,
              locations: selectedLocations,
              resources: selectedResources,
              pilots: selectedPilots,
              instructors: selectedInstructors,
              organizations: selectedOrganizations,
              showMaintenanceEvents,
              showOnlyMyEvents,
              showWaitingList
            }}
          />
        </CardBody>
      </Card>

      {/* Legend */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
              <span className="text-sm">Not Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
              <span className="text-sm">Waiting (Not Started)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span className="text-sm">In Progress (Checked Out)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              <span className="text-sm">Completed (Checked In)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
              <span className="text-sm">Overdue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
              <span className="text-sm">Maintenance</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isOpen}
        onClose={onClose}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
}

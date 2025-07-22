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
  Select,
  SelectItem,
  Checkbox,
} from "@heroui/react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Home,
  Filter,
  Plus,
} from "lucide-react";
import CreateEventModal from "../components/CreateEventModal";
import CalendarViewRenderer from "../components/calendar/CalendarViewRenderer";

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
const locations = ["All locations", "Location 1", "Location 2"];
const resources = ["All resources", "Resource 1", "Resource 2"];
const pilots = ["All pilots", "Pilot 1", "Pilot 2"];
const instructors = ["All instructors", "Instructor 1", "Instructor 2"];
const organizations = ["JetSuite", "Blue Horizon", "Test Organization"];
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
  const [selectedLocation, setSelectedLocation] =
    React.useState("All locations");
  const [selectedResource, setSelectedResource] =
    React.useState("All resources");
  const [selectedPilot, setSelectedPilot] = React.useState("All pilots");
  const [selectedInstructor, setSelectedInstructor] =
    React.useState("All instructors");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [events, setEvents] = React.useState([
    // Sample events for testing
    {
      id: '1',
      pilot: 'John Smith',
      aircraft: 'N123AB',
      instructor: 'Jane Doe',
      start: new Date(2025, 0, 8, 9, 0), // Today at 9:00 AM
      end: new Date(2025, 0, 8, 11, 0), // Today at 11:00 AM
      status: 'scheduled',
      activityType: 'Training',
      location: 'KPAO'
    },
    {
      id: '2',
      pilot: 'Mike Johnson',
      aircraft: 'N456CD',
      start: new Date(2025, 0, 8, 14, 0), // Today at 2:00 PM
      end: new Date(2025, 0, 8, 16, 0), // Today at 4:00 PM
      status: 'in-progress',
      activityType: 'Charter',
      location: 'KSQL'
    },
    {
      id: '3',
      pilot: 'Sarah Wilson',
      aircraft: 'N789EF',
      instructor: 'Bob Miller',
      start: new Date(2025, 0, 9, 10, 0), // Tomorrow at 10:00 AM
      end: new Date(2025, 0, 9, 12, 0), // Tomorrow at 12:00 PM
      status: 'scheduled',
      activityType: 'Training',
      location: 'KPAO'
    }
  ]);

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

  const handleDayClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;

    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    setSelectedDate(clickedDate);
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
    
    // Add the new event to the events array
    setEvents(prevEvents => [...prevEvents, newEvent]);
    
    // Close the modal
    onClose();
  };

  // Handle event click
  const handleEventClick = (event) => {
    // Handle event click - could open event details modal
    console.log('Event clicked:', event);
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
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

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  <Select
                    size="sm"
                    label="Timezone"
                    selectedKeys={[selectedTimezone]}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                  >
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="sm"
                    label="Location"
                    selectedKeys={[selectedLocation]}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="sm"
                    label="Resource"
                    selectedKeys={[selectedResource]}
                    onChange={(e) => setSelectedResource(e.target.value)}
                  >
                    {resources.map((resource) => (
                      <SelectItem key={resource} value={resource}>
                        {resource}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="sm"
                    label="Pilot"
                    selectedKeys={[selectedPilot]}
                    onChange={(e) => setSelectedPilot(e.target.value)}
                  >
                    {pilots.map((pilot) => (
                      <SelectItem key={pilot} value={pilot}>
                        {pilot}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="sm"
                    label="Instructor"
                    selectedKeys={[selectedInstructor]}
                    onChange={(e) => setSelectedInstructor(e.target.value)}
                  >
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor} value={instructor}>
                        {instructor}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button size="sm" color="primary" className="w-full">
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <Checkbox
                isSelected={showMaintenanceEvents}
                onValueChange={setShowMaintenanceEvents}
                size="sm"
              >
                Show Maintenance Events
              </Checkbox>
              <Checkbox
                isSelected={showOnlyMyEvents}
                onValueChange={setShowOnlyMyEvents}
                size="sm"
              >
                Show Only My Events
              </Checkbox>
              <Checkbox
                isSelected={showWaitingList}
                onValueChange={setShowWaitingList}
                size="sm"
              >
                Show Waiting List
              </Checkbox>
            </div>
          </div>

          {/* Calendar View Renderer */}
          <CalendarViewRenderer
            view={currentView}
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
            filters={{
              timezone: selectedTimezone,
              location: selectedLocation,
              resource: selectedResource,
              pilot: selectedPilot,
              instructor: selectedInstructor,
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
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
}

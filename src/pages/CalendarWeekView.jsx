import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Select,
  SelectItem,
  Checkbox,
  Input,
  Breadcrumbs,
  BreadcrumbItem,
  useDisclosure,
} from "@heroui/react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Home,
  Filter,
  Plus,
  CalendarDays,
  CalendarClock,
  Users2,
} from "lucide-react";
import CreateEventModal from "../components/CreateEventModal";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeSlots = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

const viewOptions = [
  {
    key: "calendars",
    label: "Month View",
    icon: <CalendarDays className="w-4 h-4" />,
  },
  {
    key: "calendar-week-view",
    label: "Week View",
    icon: <CalendarClock className="w-4 h-4" />,
  },
  {
    key: "calendar-resources",
    label: "Resources View",
    icon: <Users2 className="w-4 h-4" />,
  },
];

const locations = ["All locations", "Location 1", "Location 2"];
const resources = ["All resources", "Resource 1", "Resource 2"];
const pilots = ["All pilots", "Pilot 1", "Pilot 2"];
const instructors = ["All instructors", "Instructor 1", "Instructor 2"];

const timezones = [
  { label: "(America, -10:00 HST)", value: "HST" },
  { label: "(America, -09:00 AKST)", value: "AKST" },
  { label: "(America, -08:00 PST)", value: "PST" },
  { label: "(America, -07:00 MST)", value: "MST" },
  { label: "(America, -06:00 CST)", value: "CST" },
  { label: "(America, -05:00 EST)", value: "EST" },
];

export default function CalendarWeekView({ onNavigate }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = React.useState(null);
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

  const getWeekDates = () => {
    const dates = [];
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay();

    for (let i = 0; i < 7; i++) {
      const date = new Date(curr.setDate(first + i));
      dates.push(date);
    }

    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (date, time) => {
    const [hours] = time.split(":");
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(parseInt(hours, 10));
    setSelectedDate(selectedDateTime);
    onOpen();
  };

  const weekDates = React.useMemo(() => getWeekDates(), [currentDate]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem startContent={<Home className="w-4 h-4" />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbItem startContent={<Calendar className="w-4 h-4" />}>
            Calendar Week View
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button
              aria-label="Previous week"
                variant="light"
                isIconOnly
                onPress={() => navigateWeek(-1)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[200px] text-center">
                Week of {formatDate(weekDates[0])}
              </h2>
              <Button
                aria-label="Next week"
                variant="light"
                isIconOnly
                onPress={() => navigateWeek(1)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <ButtonGroup>
              {viewOptions.map((view) => (
                <Button
                  key={view.key}
                  size="sm"
                  variant={view.key === "calendar-week-view" ? "solid" : "bordered"}
                  color={view.key === "calendar-week-view" ? "primary" : "default"}
                  startContent={view.icon}
                  onPress={() => navigate(`/calendar/${view.key}`)}
                >
                  {view.label}
                </Button>
              ))}
            </ButtonGroup>

            <Button
              color="primary"
              startContent={<Plus className="w-4 h-4" />}
              onPress={() => {
                setSelectedDate(new Date());
                onOpen();
              }}
            >
              Create event
            </Button>
          </div>

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
                    onSelectionChange={(keys) => setSelectedTimezone(Array.from(keys)[0])}

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
                    onSelectionChange={(keys) => setSelectedLocation(Array.from(keys)[0])}
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
                    onSelectionChange={(keys) => setSelectedResource(Array.from(keys)[0])}
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
                    onSelectionChange={(keys) => setSelectedPilot(Array.from(keys)[0])}
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
                    onSelectionChange={(keys) => setSelectedInstructor(Array.from(keys)[0])}
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

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 text-center font-semibold w-20">
                  Time
                </div>
                {weekDates.map((date, index) => (
                  <div
                    key={index}
                    className={`bg-gray-100 dark:bg-gray-800 p-2 text-center font-semibold ${
                      isToday(date) ? "bg-primary text-white" : ""
                    }`}
                  >
                    {formatDate(date)}
                  </div>
                ))}
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {timeSlots.map((time, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700"
                  >
                    <div className="bg-background p-2 text-center text-sm w-20">
                      {time}
                    </div>
                    {weekDates.map((date, dateIndex) => (
                      <div
                        key={dateIndex}
                        className="bg-background p-2 h-16 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => handleTimeSlotClick(date, time)}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

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

      <CreateEventModal
        isOpen={isOpen}
        onClose={onClose}
        selectedDate={selectedDate}
      />
    </div>
  );
}

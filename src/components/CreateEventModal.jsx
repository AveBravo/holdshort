import React from "react";
import { parseDate } from "@internationalized/date";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
  RadioGroup,
  Radio,
  DatePicker,
  TimeInput,
} from "@heroui/react";
import {
  Calendar as CalendarIcon,
  Clock,
  Building2,
  User,
  Users,
  Plane,
  MapPin,
} from "lucide-react";

const organizations = ["JetSuite", "Blue Horizon", "Test Organization"];
const locations = ["All locations", "Location 1", "Location 2"];
const resources = ["All resources", "Resource 1", "Resource 2"];
const pilots = ["All pilots", "Pilot 1", "Pilot 2"];
const instructors = ["All instructors", "Instructor 1", "Instructor 2"];
const activityTypes = ["Not set", "Training", "Maintenance", "Charter"];


// Safe parseDate wrapper to prevent errors
const safeParseDateValue = (dateString) => {
  try {
    if (!dateString) return null;
    // If it's already a valid date string in YYYY-MM-DD format
    if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return parseDate(dateString);
    }
    return null;
  } catch (error) {
    console.warn('Error parsing date:', dateString, error);
    return null;
  }
};

const CreateEventModal = ({ isOpen, onClose, selectedDate, onCreateEvent }) => {
  const [newEvent, setNewEvent] = React.useState({
    organization: "JetSuite",
    startDate: selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    startTime: "",
    endDate: selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    endTime: "",
    location: "",
    eventType: "regular",
    pilot: "",
    secondPilot: "",
    instructor: "",
    resource: "",
    isRecurring: false,
    comments: "",
    testNumeric: "",
    testText: "",
    testDate: null,
    activityType: "Not set",
  });

  const convertCustomDateToJSDate = (customDate) => {
    if (
      customDate &&
      typeof customDate.year === "number" &&
      typeof customDate.month === "number" &&
      typeof customDate.day === "number"
    ) {
      // new Date(year, monthIndex, day)
      // Важливо: місяці в JS з 0, а в customDate - з 1
      return new Date(customDate.year, customDate.month - 1, customDate.day);
    }
    return null;
  };

  const handleCreateEvent = () => {
    console.log("New Event:", newEvent);
    onClose();
  };

  // Format time to HH:MM format
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    // If already in HH:MM format
    if (/^\d{2}:\d{2}$/.test(timeString)) {
      return timeString;
    }
    
    // If it's a Date object
    if (timeString instanceof Date) {
      return timeString.toTimeString().slice(0, 5);
    }
    
    return '';
  };

  const handleTimeChange = (value, field) => {
    // Handle both direct string input and event objects
    const timeValue = typeof value === 'object' && value !== null && value.target ? value.target.value : value;
    
    // If the value is empty, set it as is
    if (!timeValue) {
      setNewEvent(prev => ({
        ...prev,
        [field]: ''
      }));
      return;
    }
  
    // Format the time to ensure it's in HH:MM format
    let formattedTime = timeValue;
  
    // If it's a partial time (e.g., just hours entered), pad it with zeros
    if (/^\d{1,2}$/.test(timeValue)) {
      formattedTime = timeValue.padStart(2, '0') + ':00';
    } 
    // If it's in H:MM format, pad the hour
    else if (/^\d{1,2}:\d{2}$/.test(timeValue)) {
      const [hours, minutes] = timeValue.split(':');
      formattedTime = `${hours.padStart(2, '0')}:${minutes}`;
    }
  
    setNewEvent(prev => ({
      ...prev,
      [field]: formattedTime
    }));
  };

  const handleDateSelect = (date, field) => {
    if (!date) {
      setNewEvent(prev => ({
        ...prev,
        [field]: ""
      }));
      return;
    }
  
    let dateObj = null;
  
    // Check for { year, month, day } object
    if (date && typeof date.year === "number" && typeof date.month === "number" && typeof date.day === "number") {
      dateObj = convertCustomDateToJSDate(date);
    } else if (date instanceof Date) {
      if (isNaN(date.getTime())) return;
      dateObj = date;
    } else if (typeof date === "string" && date.trim() !== "") {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return;
    } else if (date && typeof date.toDate === "function") {
      dateObj = date.toDate();
      if (isNaN(dateObj.getTime())) return;
    } else {
      return;
    }
  
    if (!dateObj) return;
  
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const isoString = `${year}-${month}-${day}`;
  
    setNewEvent(prev => ({
      ...prev,
      [field]: isoString,
    }));
  };
  
  
  
  
  // Format date for DatePicker value - ensures we always return a valid Date or null
  const formatDateForPicker = (dateInput) => {
    try {
      // Якщо рядок — спробувати парсити
      if (typeof dateInput === "string" && dateInput.trim() !== "") {
        const parsed = new Date(dateInput);
        if (!isNaN(parsed.getTime())) {
          return parsed;
        }
      }
      // Якщо це Date об'єкт
      if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
        return dateInput;
      }
      // Якщо це об'єкт { year, month, day }
      if (
        dateInput &&
        typeof dateInput.year === "number" &&
        typeof dateInput.month === "number" &&
        typeof dateInput.day === "number"
      ) {
        return convertCustomDateToJSDate(dateInput);
      }
      return null;
    } catch {
      return null;
    }
  };
  
  
  

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="outside"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-2">
              <CalendarIcon className="w-6 h-6" />
              New Regular Event
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Organization */}
                <div className="md:col-span-2">
                  <Select
                    label="Organization"
                    labelPlacement="outside"
                    placeholder="Select organization"
                    startContent={
                      <Building2 className="w-4 h-4 text-default-400" />
                    }
                    value={newEvent.organization}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, organization: e.target.value })
                    }
                  >
                    {organizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                  <DatePicker
                    label="Start Date"
                    value={safeParseDateValue(newEvent.startDate)}
                    onChange={(date) => {
                      if (date) {
                        const dateString = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
                        setNewEvent(prev => ({ ...prev, startDate: dateString }));
                      }
                    }}
                  />
                  <TimeInput
                    label="Start Time"
                    labelPlacement="outside"
                    placeholder="HH:MM"
                    value={newEvent.startTime}
                    onChange={(e) => handleTimeChange(e, "startTime")}
                    type="time"
                    step="300" // 5 minute steps
                    pattern="[0-9]{2}:[0-9]{2}"
                  />
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <DatePicker
                    label="End Date"
                    value={safeParseDateValue(newEvent.endDate)}
                    onChange={(date) => {
                      if (date) {
                        const dateString = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
                        setNewEvent(prev => ({ ...prev, endDate: dateString }));
                      }
                    }}
                  />
                  <TimeInput
                    label="End Time"
                    labelPlacement="outside"
                    placeholder="HH:MM"
                    value={newEvent.endTime}
                    onChange={(e) => handleTimeChange(e, "endTime")}
                    type="time"
                    step="300" // 5 minute steps
                    min={newEvent.startDate === newEvent.endDate ? newEvent.startTime : undefined}
                  />
                </div>

                {/* Location */}
                <Select
                  label="Location"
                  labelPlacement="outside"
                  placeholder="Select location"
                  startContent={<MapPin className="w-4 h-4 text-default-400" />}
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                >
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </Select>

                {/* Event Type */}
                <RadioGroup
                  label="Event Type"
                  orientation="horizontal"
                  value={newEvent.eventType}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, eventType: value })
                  }
                >
                  <Radio value="regular">Regular</Radio>
                  <Radio value="maintenance">Maintenance</Radio>
                </RadioGroup>

                {/* Pilot */}
                <Select
                  label="Pilot"
                  labelPlacement="outside"
                  placeholder="Select pilot"
                  startContent={<User className="w-4 h-4 text-default-400" />}
                  value={newEvent.pilot}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, pilot: e.target.value })
                  }
                >
                  {pilots.map((pilot) => (
                    <SelectItem key={pilot} value={pilot}>
                      {pilot}
                    </SelectItem>
                  ))}
                </Select>

                {/* Second Pilot */}
                <Select
                  label="Second Pilot"
                  labelPlacement="outside"
                  placeholder="Select second pilot"
                  startContent={<Users className="w-4 h-4 text-default-400" />}
                  value={newEvent.secondPilot}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, secondPilot: e.target.value })
                  }
                >
                  {pilots.map((pilot) => (
                    <SelectItem key={pilot} value={pilot}>
                      {pilot}
                    </SelectItem>
                  ))}
                </Select>

                {/* Instructor */}
                <Select
                  label="Instructor"
                  labelPlacement="outside"
                  placeholder="Select instructor"
                  startContent={<User className="w-4 h-4 text-default-400" />}
                  value={newEvent.instructor}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, instructor: e.target.value })
                  }
                >
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor} value={instructor}>
                      {instructor}
                    </SelectItem>
                  ))}
                </Select>

                {/* Resource */}
                <Select
                  label="Resource"
                  labelPlacement="outside"
                  placeholder="Select resource"
                  startContent={<Plane className="w-4 h-4 text-default-400" />}
                  value={newEvent.resource}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, resource: e.target.value })
                  }
                >
                  {resources.map((resource) => (
                    <SelectItem key={resource} value={resource}>
                      {resource}
                    </SelectItem>
                  ))}
                </Select>

                {/* Recurring Event */}
                <div className="md:col-span-2">
                  <Checkbox
                    isSelected={newEvent.isRecurring}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, isRecurring: value })
                    }
                  >
                    Recurring Event
                  </Checkbox>
                </div>

                {/* Comments */}
                <div className="md:col-span-2">
                  <Textarea
                    label="Comments"
                    labelPlacement="outside"
                    placeholder="Enter comments"
                    value={newEvent.comments}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, comments: e.target.value })
                    }
                  />
                </div>

                {/* Custom Fields */}
                <Input
                  type="number"
                  label="Test Numeric"
                  labelPlacement="outside"
                  placeholder="Enter numeric value"
                  value={newEvent.testNumeric}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, testNumeric: e.target.value })
                  }
                />

                <Input
                  label="Test Text"
                  labelPlacement="outside"
                  placeholder="Enter text"
                  value={newEvent.testText}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, testText: e.target.value })
                  }
                />
                <Select
                  label="Activity Type"
                  labelPlacement="outside"
                  placeholder="Select activity type"
                  value={newEvent.activityType}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, activityType: e.target.value })
                  }
                >
                  {activityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="bordered" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleCreateEvent}>
                Add Event
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateEventModal;
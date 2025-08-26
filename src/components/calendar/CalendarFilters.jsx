import React, { useMemo } from "react";
import {
  Select,
  SelectItem,
  Checkbox,
  Button,
  Chip,
} from "@heroui/react";
import { Filter } from "lucide-react";

const CalendarFilters = ({
  selectedTimezone,
  setSelectedTimezone,
  selectedLocations,
  setSelectedLocations,
  selectedResources,
  setSelectedResources,
  selectedPilots,
  setSelectedPilots,
  selectedInstructors,
  setSelectedInstructors,
  selectedOrganizations,
  setSelectedOrganizations,
  showMaintenanceEvents,
  setShowMaintenanceEvents,
  showOnlyMyEvents,
  setShowOnlyMyEvents,
  showWaitingList,
  setShowWaitingList,
  timezones,
  locations,
  resources,
  pilots,
  instructors,
  organizations,
  organizationData,
  onFilter,
}) => {
  // Filter options based on selected organizations
  const filteredOptions = useMemo(() => {
    // If no organizations selected, show all options
    if (!selectedOrganizations || selectedOrganizations.size === 0) {
      return {
        locations,
        resources,
        pilots,
        instructors
      };
    }
    
    // Get data for selected organizations
    const selectedOrgs = Array.from(selectedOrganizations);
    
    // Combine data from all selected organizations
    const filteredLocations = [...new Set(selectedOrgs.flatMap(org => organizationData[org]?.locations || []))];
    const filteredResources = [...new Set(selectedOrgs.flatMap(org => organizationData[org]?.resources || []))];
    const filteredPilots = [...new Set(selectedOrgs.flatMap(org => organizationData[org]?.pilots || []))];
    const filteredInstructors = [...new Set(selectedOrgs.flatMap(org => organizationData[org]?.instructors || []))];
    
    return {
      locations: filteredLocations,
      resources: filteredResources,
      pilots: filteredPilots,
      instructors: filteredInstructors
    };
  }, [selectedOrganizations, organizationData, locations, resources, pilots, instructors]);
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
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
                label="Organizations"
                selectionMode="multiple"
                selectedKeys={selectedOrganizations}
                onSelectionChange={(newSelection) => {
                  console.log('Organization selection changed:', Array.from(newSelection));
                  setSelectedOrganizations(newSelection);
                  
                  if (newSelection.size > 0) {
                    const newFilteredOptions = [...new Set(Array.from(newSelection).flatMap(org => organizationData[org]?.locations || []))];
                    setSelectedLocations(prev => {
                      const validSelections = new Set([...prev].filter(item => newFilteredOptions.includes(item)));
                      return validSelections;
                    });
                    
                    const newFilteredResources = [...new Set(Array.from(newSelection).flatMap(org => organizationData[org]?.resources || []))];
                    setSelectedResources(prev => {
                      const validSelections = new Set([...prev].filter(item => newFilteredResources.includes(item)));
                      return validSelections;
                    });
                    
                    const newFilteredPilots = [...new Set(Array.from(newSelection).flatMap(org => organizationData[org]?.pilots || []))];
                    setSelectedPilots(prev => {
                      const validSelections = new Set([...prev].filter(item => newFilteredPilots.includes(item)));
                      return validSelections;
                    });
                    
                    const newFilteredInstructors = [...new Set(Array.from(newSelection).flatMap(org => organizationData[org]?.instructors || []))];
                    setSelectedInstructors(prev => {
                      const validSelections = new Set([...prev].filter(item => newFilteredInstructors.includes(item)));
                      return validSelections;
                    });
                  }
                }}
                placeholder="Select organizations..."
                classNames={{
                  trigger: "min-h-unit-8",
                  listboxWrapper: "max-h-[400px]"
                }}
                listboxProps={{
                  itemClasses: {
                    base: "text-sm"
                  },
                  topContent: (
                    <div className="flex items-center gap-2 p-2">
                      <Checkbox
                        isSelected={selectedOrganizations.size === organizations.length}
                        isIndeterminate={selectedOrganizations.size > 0 && selectedOrganizations.size < organizations.length}
                        onValueChange={(selected) => {
                          if (selected) {
                            setSelectedOrganizations(new Set(organizations));
                          } else {
                            setSelectedOrganizations(new Set());
                          }
                        }}
                      >
                        <span className="text-sm">Select All</span>
                      </Checkbox>
                    </div>
                  ),
                  topContentPlacement: "inside",
                  shouldHighlightOnHover: true,
                  emptyContent: "No organizations found"
                }}
                renderValue={(items) => {
                  console.log('Rendering organization select with items:', items);
                  return items.length > 0 ? (
                    <div className="flex items-center">
                      {items.length > 1 ? (
                        <span>{items.length} organizations selected</span>
                      ) : (
                        <span>{items[0].textValue}</span>
                      )}
                    </div>
                  ) : null;
                }}
              >
                {organizations.map((organization) => (
                  <SelectItem key={organization} value={organization}>
                    {organization}
                  </SelectItem>
                ))}
              </Select>
              <Select
                size="sm"
                label="Locations"
                selectionMode="multiple"
                selectedKeys={selectedLocations}
                onSelectionChange={setSelectedLocations}
                placeholder="Select locations..."
                isDisabled={selectedOrganizations.size === 0}
                classNames={{
                  trigger: "min-h-unit-8",
                  listboxWrapper: "max-h-[400px]"
                }}
                listboxProps={{
                  itemClasses: {
                    base: "text-sm"
                  },
                  topContent: (
                    <div className="flex items-center gap-2 p-2">
                      <Checkbox
                        isSelected={selectedLocations.size === filteredOptions.locations.length && filteredOptions.locations.length > 0}
                        isIndeterminate={selectedLocations.size > 0 && selectedLocations.size < filteredOptions.locations.length}
                        onValueChange={(selected) => {
                          if (selected) {
                            setSelectedLocations(new Set(filteredOptions.locations));
                          } else {
                            setSelectedLocations(new Set());
                          }
                        }}
                        isDisabled={selectedOrganizations.size === 0}
                      >
                        <span className="text-sm">Select All</span>
                      </Checkbox>
                    </div>
                  ),
                  topContentPlacement: "inside",
                  shouldHighlightOnHover: true,
                  emptyContent: "No locations found"
                }}
              >
                {filteredOptions.locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </Select>
              <Select
                size="sm"
                label="Resources"
                selectionMode="multiple"
                selectedKeys={selectedResources}
                onSelectionChange={setSelectedResources}
                placeholder="Select resources..."
                isDisabled={selectedOrganizations.size === 0}
                classNames={{
                  trigger: "min-h-unit-8",
                  listboxWrapper: "max-h-[400px]"
                }}
                listboxProps={{
                  itemClasses: {
                    base: "text-sm"
                  },
                  topContent: (
                    <div className="flex items-center gap-2 p-2">
                      <Checkbox
                        isSelected={selectedResources.size === filteredOptions.resources.length && filteredOptions.resources.length > 0}
                        isIndeterminate={selectedResources.size > 0 && selectedResources.size < filteredOptions.resources.length}
                        onValueChange={(selected) => {
                          if (selected) {
                            setSelectedResources(new Set(filteredOptions.resources));
                          } else {
                            setSelectedResources(new Set());
                          }
                        }}
                        isDisabled={selectedOrganizations.size === 0}
                      >
                        <span className="text-sm">Select All</span>
                      </Checkbox>
                    </div>
                  ),
                  topContentPlacement: "inside",
                  shouldHighlightOnHover: true,
                  emptyContent: "No resources found"
                }}
              >
                {filteredOptions.resources.map((resource) => (
                  <SelectItem key={resource} value={resource}>
                    {resource}
                  </SelectItem>
                ))}
              </Select>
              <Select
                size="sm"
                label="Pilots"
                selectionMode="multiple"
                selectedKeys={selectedPilots}
                onSelectionChange={setSelectedPilots}
                placeholder="Select pilots..."
                isDisabled={selectedOrganizations.size === 0}
                classNames={{
                  trigger: "min-h-unit-8",
                  listboxWrapper: "max-h-[400px]"
                }}
                listboxProps={{
                  itemClasses: {
                    base: "text-sm"
                  },
                  topContent: (
                    <div className="flex items-center gap-2 p-2">
                      <Checkbox
                        isSelected={selectedPilots.size === filteredOptions.pilots.length && filteredOptions.pilots.length > 0}
                        isIndeterminate={selectedPilots.size > 0 && selectedPilots.size < filteredOptions.pilots.length}
                        onValueChange={(selected) => {
                          if (selected) {
                            setSelectedPilots(new Set(filteredOptions.pilots));
                          } else {
                            setSelectedPilots(new Set());
                          }
                        }}
                        isDisabled={selectedOrganizations.size === 0}
                      >
                        <span className="text-sm">Select All</span>
                      </Checkbox>
                    </div>
                  ),
                  topContentPlacement: "inside",
                  shouldHighlightOnHover: true,
                  emptyContent: "No pilots found"
                }}
              >
                {filteredOptions.pilots.map((pilot) => (
                  <SelectItem key={pilot} value={pilot}>
                    {pilot}
                  </SelectItem>
                ))}
              </Select>
              <Select
                size="sm"
                label="Instructors"
                selectionMode="multiple"
                selectedKeys={selectedInstructors}
                onSelectionChange={setSelectedInstructors}
                placeholder="Select instructors..."
                isDisabled={selectedOrganizations.size === 0}
                classNames={{
                  trigger: "min-h-unit-8",
                  listboxWrapper: "max-h-[400px]"
                }}
                listboxProps={{
                  itemClasses: {
                    base: "text-sm"
                  },
                  topContent: (
                    <div className="flex items-center gap-2 p-2">
                      <Checkbox
                        isSelected={selectedInstructors.size === filteredOptions.instructors.length && filteredOptions.instructors.length > 0}
                        isIndeterminate={selectedInstructors.size > 0 && selectedInstructors.size < filteredOptions.instructors.length}
                        onValueChange={(selected) => {
                          if (selected) {
                            setSelectedInstructors(new Set(filteredOptions.instructors));
                          } else {
                            setSelectedInstructors(new Set());
                          }
                        }}
                        isDisabled={selectedOrganizations.size === 0}
                      >
                        <span className="text-sm">Select All</span>
                      </Checkbox>
                    </div>
                  ),
                  topContentPlacement: "inside",
                  shouldHighlightOnHover: true,
                  emptyContent: "No instructors found"
                }}
              >
                {filteredOptions.instructors.map((instructor) => (
                  <SelectItem key={instructor} value={instructor}>
                    {instructor}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                size="lg" 
                radius="lg" 
                color="primary" 
                className="min-w-[100px]"
                onPress={onFilter}
              >
                Apply
              </Button>
            </div>
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
  );
};

export default CalendarFilters;

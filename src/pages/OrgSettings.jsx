import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Divider,
  CheckboxGroup,
} from "@heroui/react";
import { Home, Building2, Settings, Clock, Bell, Plus, Trash2, Timer, Calendar, Shield, Share2, ListPlus, Palette } from 'lucide-react';

const timeUnits = [
  { label: 'Hobbs Meter', value: 'hobbs' },
  { label: 'Tach Time', value: 'tach' },
  { label: 'Block Time', value: 'block' },
];

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} Month${i === 0 ? '' : 's'}`,
  value: `${i + 1}`,
}));

const fieldTypes = [
  { label: 'Numeric', value: 'numeric' },
  { label: 'Text', value: 'text' },
  { label: 'Date', value: 'date' },
];

const customFields = [
  { id: 1, name: 'Test Numeric', type: 'numeric', required: false },
  { id: 2, name: 'Test Text', type: 'text', required: false },
  { id: 3, name: 'Test Date4', type: 'date', required: false },
];

const activityTypes = [
  { id: 1, name: 'test', color: '#FF0000' },
];

export default function OrganizationSettings({ onNavigate }) {
  const [selectedTab, setSelectedTab] = React.useState("general");
  const [isPrivate, setIsPrivate] = React.useState(true);
  const [newCustomField, setNewCustomField] = React.useState({ name: '', type: 'numeric', required: false });
  const [newActivityType, setNewActivityType] = React.useState({ name: '', color: '#000000' });

  const SectionTitle = ({ icon, children }) => (
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-lg font-semibold">{children}</h3>
    </div>
  );

  const Section = ({ children, className = "" }) => (
    <Card className={className}>
      <CardBody>{children}</CardBody>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem
            startContent={<Home className="w-4 h-4" />}
            onPress={() => onNavigate({ page: "home" })}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem
            startContent={<Building2 className="w-4 h-4" />}
            onPress={() => onNavigate({ page: "organization" })}
          >
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Settings className="w-4 h-4" />}>
            Settings
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <Card>
        <CardHeader>
          <Tabs
            aria-label="Organization settings"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key)}
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-6",
              cursor: "w-full bg-primary",
            }}
          >
            <Tab
              key="general"
              title={
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Organization Settings</span>
                </div>
              }
            />
            <Tab
              key="calendar"
              title={
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Organization Calendar Settings</span>
                </div>
              }
            />
          </Tabs>
        </CardHeader>
        <CardBody>
          {selectedTab === "general" && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  Time Recording Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Record Instructor Time by"
                    defaultSelectedKeys={["hobbs"]}
                    aria-label="Select instructor time recording unit"
                  >
                    {timeUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Record Resource Time by"
                    defaultSelectedKeys={["hobbs"]}
                    aria-label="Select resource time recording unit"
                  >
                    {timeUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Checkbox isSelected={isPrivate} onValueChange={setIsPrivate}>
                  Private organization. Hide organization from search results
                </Checkbox>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">
                    Notifications for Calendar-based Inspections
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      label="First notification"
                      defaultValue="2"
                      className="w-40"
                    />
                    <Select
                      label="Time unit"
                      defaultSelectedKeys={["2"]}
                      className="flex-1"
                      aria-label="Select time unit for first notification"
                    >
                      {monthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      label="Second notification"
                      defaultValue="1"
                      className="w-40"
                    />
                    <Select
                      label="Time unit"
                      defaultSelectedKeys={["1"]}
                      className="flex-1"
                      aria-label="Select time unit for second notification"
                    >
                      {monthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">
                    Notifications for Meter-based Inspections
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      label="First notification"
                      defaultValue="50"
                      className="w-40"
                    />
                    <span className="text-default-500 self-end mb-3">
                      hours
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      label="Second notification"
                      defaultValue="10"
                      className="w-40"
                    />
                    <span className="text-default-500 self-end mb-3">
                      hours
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button color="primary" className="px-8">
                  Save Settings
                </Button>
              </div>
            </div>
          )}

          {selectedTab === "calendar" && (
            <div className="space-y-6">
              {/* Event Duration Settings */}
              <Section>
                <SectionTitle icon={<Timer className="w-5 h-5 text-primary" />}>
                  Event Duration Settings
                </SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">Maximum Event Length</h4>
                      <span className="text-xs text-default-400">
                        (Enter 0 for unlimited)
                      </span>
                    </div>
                    <div className="flex gap-4 items-end">
                      <Input
                        type="number"
                        label="Hours"
                        placeholder="0"
                        className="w-40"
                        min={0}
                      />
                      <Input
                        type="number"
                        label="Minutes"
                        placeholder="0"
                        className="w-32"
                        min={0}
                        max={59}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">Default Event Length</h4>
                      <span className="text-xs text-default-400">
                        (Must be greater than 0)
                      </span>
                    </div>
                    <div className="flex gap-4 items-end">
                      <Input
                        type="number"
                        label="Hours"
                        placeholder="1"
                        className="w-32"
                        min={0}
                      />
                      <Input
                        type="number"
                        label="Minutes"
                        placeholder="0"
                        className="w-32"
                        min={0}
                        max={59}
                      />
                    </div>
                  </div>
                </div>
              </Section>

              {/* Event Limits */}
              <Section>
                <SectionTitle icon={<Clock className="w-5 h-5 text-primary" />}>
                  Event Limits
                </SectionTitle>
                <div className="max-w-xs">
                  <Input
                    type="number"
                    label="Maximum Number of Future Events per User"
                    placeholder="0"
                    description="Enter 0 for unlimited events"
                    min={0}
                  />
                </div>
              </Section>

              {/* Enforcement Settings */}
              <Section>
                <SectionTitle
                  icon={<Shield className="w-5 h-5 text-primary" />}
                >
                  Enforcement Settings
                </SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <CheckboxGroup label="Enforcement Settings">
                  <Checkbox value="pilot-instructor-certificate-ratings" defaultSelected={false}>
                    Enforce Pilot and Instructor Certificate Ratings
                  </Checkbox>
                  <Checkbox value="endorsements" defaultSelected={false}>
                    Enforce Endorsements
                  </Checkbox>
                  <Checkbox value="organization-flight-review" defaultSelected={false}>
                    Enforce Organization Flight Review
                  </Checkbox>
                  <Checkbox value="faa-flight-review" defaultSelected={false}>
                    Enforce FAA Flight Review
                  </Checkbox>
                  <Checkbox value="medical-certificates" defaultSelected={false}>
                    Enforce Medical Certificates
                  </Checkbox>
                  <Checkbox value="tsa-recurrent-training" defaultSelected={true}>
                    Enforce TSA Recurrent Training
                  </Checkbox>
                  <Checkbox value="renters-insurance" defaultSelected={false}>
                    Enforce Renter's Insurance
                  </Checkbox>
                  <Checkbox value="ground-aircraft" defaultSelected={false}>
                    Automatically Ground Aircraft for Overdue Inspections
                  </Checkbox>
                  <Checkbox value="comments-mandatory" defaultSelected={false} className="md:col-span-2">
                    Comments are Mandatory in Events
                  </Checkbox>
                  </CheckboxGroup>
                </div>
              </Section>

              {/* Event Sharing Settings */}
              <Section>
                <SectionTitle
                  icon={<Share2 className="w-5 h-5 text-primary" />}
                >
                  Event Sharing Settings
                </SectionTitle>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-1">
                    <Checkbox value="event-sharing" defaultSelected={true}>
                      Allow event sharing
                    </Checkbox>
                    <p className="text-small text-default-500 ml-6">
                      Allow event sharing with all users with the Pilot Role via
                      email when creating an event
                    </p>
                    <div className="space-y-1">
                      <Checkbox value="activity-types" defaultSelected={true}>
                        Enable activity types
                      </Checkbox>
                      <p className="text-small text-default-500 ml-6">
                        Allow set an activity type for an event, enable Activity
                        Type Color Scheme
                      </p>
                    </div>
                    <Checkbox value="flight-following" defaultSelected={true}>
                      Enable Flight Following
                    </Checkbox>
                    <p className="text-small text-default-500 ml-6">
                      Allow set an activity type for an event, enable Activity
                      Type Color Scheme
                    </p>
                    <Checkbox value="reverse-seat-numbers" defaultSelected={true}>
                      Reverse seat numbers in manifest
                    </Checkbox>
                    <p className="text-small text-default-500 ml-6">
                      Allow set an activity type for an event, enable Activity
                      Type Color Scheme
                    </p>
                    <Checkbox value="pilot-not-required" defaultSelected={true}>
                      Pilot not required
                    </Checkbox>
                    <p className="text-small text-default-500 ml-6">
                      Allow set an activity type for an event, enable Activity
                      Type Color Scheme
                    </p>
                  </div>
                </div>
              </Section>

              {/* Custom Event Fields */}
              <Section>
                <SectionTitle
                  icon={<ListPlus className="w-5 h-5 text-primary" />}
                >
                  Custom Event Fields
                </SectionTitle>
                <Table
                  aria-label="Custom event fields"
                  classNames={{
                    wrapper: "shadow-none",
                  }}
                >
                  <TableHeader>
                    <TableColumn width={70}>#</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn width={200}>Type</TableColumn>
                    <TableColumn width={100}>Required</TableColumn>
                    <TableColumn width={200}>Action</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {customFields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{field.name}</TableCell>
                        <TableCell>{field.type}</TableCell>
                        <TableCell>
                          <Checkbox isSelected={field.required} />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" color="primary">
                              Save
                            </Button>
                            <Button size="sm" color="danger" isIconOnly>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>{customFields.length + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={newCustomField.name}
                          onChange={(e) =>
                            setNewCustomField({
                              ...newCustomField,
                              name: e.target.value,
                            })
                          }
                          size="sm"
                          placeholder="Field name"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          size="sm"
                          value={newCustomField.type}
                          onChange={(e) =>
                            setNewCustomField({
                              ...newCustomField,
                              type: e.target.value,
                            })
                          }
                          placeholder="Select type"
                          aria-label="Select custom event field type"
                        >
                          {fieldTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          isSelected={newCustomField.required}
                          onValueChange={(value) =>
                            setNewCustomField({
                              ...newCustomField,
                              required: value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          color="primary"
                          startContent={<Plus className="w-4 h-4" />}
                        >
                          Add Field
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Section>

              {/* Activity Types */}
              <Section>
                <SectionTitle
                  icon={<Palette className="w-5 h-5 text-primary" />}
                >
                  Activity Types
                </SectionTitle>
                <Table
                  aria-label="Activity types"
                  classNames={{
                    wrapper: "shadow-none",
                  }}
                >
                  <TableHeader>
                    <TableColumn width={70}>#</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn width={200}>Color</TableColumn>
                    <TableColumn width={200}>Action</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {activityTypes.map((type, index) => (
                      <TableRow key={type.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{type.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: type.color }}
                            />
                            {type.color}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" color="primary">
                              Save
                            </Button>
                            <Button size="sm" color="danger" isIconOnly>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>{activityTypes.length + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={newActivityType.name}
                          onChange={(e) =>
                            setNewActivityType({
                              ...newActivityType,
                              name: e.target.value,
                            })
                          }
                          size="sm"
                          placeholder="Activity name"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={newActivityType.color}
                            onChange={(e) =>
                              setNewActivityType({
                                ...newActivityType,
                                color: e.target.value,
                              })
                            }
                            size="sm"
                            className="w-20"
                          />
                          <span className="text-default-500">
                            {newActivityType.color}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          color="primary"
                          startContent={<Plus className="w-4 h-4" />}
                        >
                          Add Type
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Section>

              <div className="flex justify-end mt-8">
                <Button color="primary" size="lg" className="px-8">
                  Save All Settings
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
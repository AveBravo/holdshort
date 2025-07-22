import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Chip,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Breadcrumbs,
  BreadcrumbItem,
} from '@heroui/react';
import {
  Home,
  Building2,
  Plane,
  Plus,
  Users,
  Eye,
  Edit,
  Settings,
  MapPin,
  Filter,
} from 'lucide-react';

const locations = [
  { value: 'all', label: 'All locations' },
  { value: 'las-vegas', label: 'Las Vegas' },
  { value: 'boulder-city', label: 'Boulder City' },
];

const resourceTypes = [
  { value: 'aircraft', label: 'Aircraft' },
  { value: 'instructor', label: 'Instructor' },
  { value: 'simulator', label: 'Simulator' },
  { value: 'equipment', label: 'Equipment' },
];

const aircraftData = [
  { id: 1, name: 'N130GC-41', location: 'Las Vegas', type: 'Aircraft', rate: '$150/hr' },
  { id: 2, name: 'N131GC-42', location: 'Boulder City', type: 'Aircraft', rate: '$145/hr' },
  { id: 3, name: 'N132GC-43', location: 'Boulder City', type: 'Aircraft', rate: '$140/hr' },
  { id: 4, name: 'N133PH-49', location: 'Boulder City', type: 'Aircraft', rate: '$155/hr' },
  { id: 5, name: 'N135PH-39', location: 'Boulder City', type: 'Aircraft', rate: '$160/hr' },
  { id: 6, name: 'N177GC Twin Otter', location: 'Boulder City', type: 'Aircraft', rate: '$250/hr' },
  { id: 7, name: 'N178GC Twin Otter', location: 'Boulder City', type: 'Aircraft', rate: '$250/hr' },
  { id: 8, name: 'N180GC - C208', location: 'Boulder City', type: 'Aircraft', rate: '$300/hr' },
  { id: 9, name: 'N181GC - C208', location: 'Boulder City', type: 'Aircraft', rate: '$300/hr' },
  { id: 10, name: 'N183GC - C208', location: 'Boulder City', type: 'Aircraft', rate: '$300/hr' },
  { id: 11, name: 'N835GC-17', location: 'Las Vegas', type: 'Aircraft', rate: '$165/hr' },
  { id: 12, name: 'N836GC-50', location: 'Las Vegas', type: 'Aircraft', rate: '$170/hr' },
];

import { useNavigate } from 'react-router-dom';

export default function ResourcesPage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = React.useState('all');
  const [selectedType, setSelectedType] = React.useState('aircraft');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newResourceType, setNewResourceType] = React.useState('aircraft');

  const filteredResources = aircraftData.filter(resource => {
    if (selectedLocation === 'all') return true;
    return resource.location.toLowerCase().replace(' ', '-') === selectedLocation;
  });

  const handleEditResource = (resourceId) => {
    // Navigate to aircraft details page
    navigate(`/aircraft-details/${resourceId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem 
            startContent={<Home className="w-4 h-4" />}
            onPress={() => navigate("/")}>
          
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Building2 className="w-4 h-4" />}
            onPress={() => navigate("/organizations")}>
          
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Plane className="w-4 h-4" />}>
            Resources
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Add Resource Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Add Resource</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select
                  selectedKeys={[newResourceType]}
                  onSelectionChange={(keys) => setNewResourceType(Array.from(keys)[0])}
                >
                  {resourceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                color="success"
                startContent={<Plus className="w-4 h-4" />}
                onPress={onOpen}
                className="w-full"
              >
                Add {newResourceType === 'aircraft' ? 'Aircraft' : 'Resource'}
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold">Resources</h2>
                <p className="text-default-500">Manage your organization's resources</p>
              </div>
              <div className="flex gap-2">
                <Select
                  label="Filter Locations"
                  selectedKeys={[selectedLocation]}
                  onSelectionChange={(keys) => setSelectedLocation(Array.from(keys)[0])}
                  className="w-48"
                  startContent={<Filter className="w-4 h-4" />}
                >
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </CardHeader>
            <CardBody>
              {/* Resource Type Indicator */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <span className="text-sm font-medium">Aircraft</span>
                  </div>
                  <span className="text-sm text-default-500">Disallowed types:</span>
                </div>
              </div>

              {/* Resources Table */}
              <Table aria-label="Resources table">
                <TableHeader>
                  <TableColumn>TYPE</TableColumn>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>LOCATION</TableColumn>
                  <TableColumn>RATE</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary rounded-sm"></div>
                          <Plane className="w-4 h-4" />
                          <span>{resource.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{resource.name}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-default-400" />
                          <span>{resource.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip color="primary" variant="flat" size="sm">
                          {resource.rate}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Tooltip content="View Details">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="default"
                            >
                              <Users className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="View Resource">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="primary"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit Resource">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="warning"
                              onPress={() => handleEditResource(resource.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Settings">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="default"
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Add Resource Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New {newResourceType === 'aircraft' ? 'Aircraft' : 'Resource'}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Resource Name"
                    placeholder="Enter resource name (e.g., N123AB)"
                    variant="bordered"
                  />
                  <Select
                    label="Location"
                    placeholder="Select location"
                    variant="bordered"
                  >
                    {locations.filter(loc => loc.value !== 'all').map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Hourly Rate"
                    placeholder="Enter hourly rate (e.g., 150)"
                    variant="bordered"
                    startContent="$"
                    endContent="/hr"
                  />
                  <Input
                    label="Description"
                    placeholder="Enter resource description"
                    variant="bordered"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add Resource
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
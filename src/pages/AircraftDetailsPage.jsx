import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Breadcrumbs,
  BreadcrumbItem,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import {
  Home,
  Building2,
  Plane,
  X,
  Edit,
  Trash2,
  Eye,
  Settings,
  Wrench,
  Scale,
  AlertTriangle,
  Gauge,
} from 'lucide-react';

// Aircraft data has been moved to aircraftDatabase object above

const locations = [
  { value: 'boulder-city', label: 'Boulder City' },
  { value: 'las-vegas', label: 'Las Vegas' },
];

const ratingOptions = [
  { value: 'helicopter', label: 'Helicopter' },
  { value: 'airplane', label: 'Airplane' },
  { value: 'glider', label: 'Glider' },
];

const medicalOptions = [
  { value: 'none', label: 'None' },
  { value: 'class1', label: 'Class 1' },
  { value: 'class2', label: 'Class 2' },
  { value: 'class3', label: 'Class 3' },
];

import { useParams, useNavigate } from 'react-router-dom';

// Mock data - in a real app, this would come from an API
const aircraftDatabase = {
  '1': {
    name: 'N133PH-49',
    registrationNumber: 'N133PH',
    manufacturer: 'EUROCOPTER',
    model: 'EC 130 B4',
    popularName: '–',
    aircraftType: 'rotorcraft',
    engineType: 'turbo-shaft',
    aircraftCategory: 'land',
    engines: '1',
    seatsNumber: '6',
    speed: '0000',
    location: 'Boulder City',
    rate: '–',
    pilotRatingRequired: 'Helicopter',
    instructorRatingRequired: 'Helicopter',
    medicalCertificateRequired: 'None',
    endorsements: {
      complex: false,
      highPerformance: false,
      tailwheel: false,
      highAltitudeOperations: false,
    },
    inspections: [],
    meters: {
      hobbs: '0.00',
      engine1: '0.00',
    },
    discrepancies: [],
  },
  // Add more aircraft data as needed
};

export default function AircraftDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aircraftInfo, setAircraftInfo] = React.useState(() => ({
    ...aircraftDatabase[id] || aircraftDatabase['1'], // Default to first aircraft if not found
  }));
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [isEditing, setIsEditing] = React.useState(false);
  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAircraftInfo(aircraftData); // Reset to original data
  };

  const updateField = (field, value) => {
    setAircraftInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateEndorsement = (endorsement, value) => {
    setAircraftInfo(prev => ({
      ...prev,
      endorsements: {
        ...prev.endorsements,
        [endorsement]: value
      }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem 
            startContent={<Home className="w-4 h-4" />}
            onPress={() => navigate("/")} 
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Building2 className="w-4 h-4" />}
            onPress={() => navigate("/organizations")}
          >
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Plane className="w-4 h-4" />}
            onPress={() => navigate("/resources")}
          >
            Resources
          </BreadcrumbItem>
          <BreadcrumbItem>
            {aircraftInfo.name}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Plane className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{aircraftInfo.name}</h1>
            <p className="text-default-500">EUROCOPTER EC 130 B4</p>
          </div>
          <Chip color="default" variant="flat">Unknown</Chip>
        </div>
        <div className="flex gap-2">
          <Button
            variant="light"
            startContent={<Eye className="w-4 h-4" />}
          >
            View Aircraft
          </Button>
          <Button
            color="danger"
            variant="light"
            startContent={<Trash2 className="w-4 h-4" />}
            onPress={onDeleteOpen}
          >
            Delete Aircraft
          </Button>
          {!isEditing ? (
            <Button
              color="primary"
              startContent={<Edit className="w-4 h-4" />}
              onPress={() => setIsEditing(true)}
            >
              Edit Aircraft
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                color="danger"
                variant="light"
                onPress={handleCancel}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
              >
                Save Changes
              </Button>
            </div>
          )}
          <Button
            variant="light"
            isIconOnly
            onPress={() => navigate("/resources")}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Aircraft Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Aircraft Information</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-default-600">Aircraft Name</label>
                    {isEditing ? (
                      <Input
                        value={aircraftInfo.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{aircraftInfo.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Registration Number</label>
                    {isEditing ? (
                      <Input
                        value={aircraftInfo.registrationNumber}
                        onChange={(e) => updateField('registrationNumber', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{aircraftInfo.registrationNumber}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Manufacturer</label>
                    <p className="font-medium">{aircraftInfo.manufacturer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Model</label>
                    <p className="font-medium">{aircraftInfo.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Popular Name</label>
                    <p className="font-medium">{aircraftInfo.popularName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Aircraft Type</label>
                    <p className="font-medium">{aircraftInfo.aircraftType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Engine Type</label>
                    <p className="font-medium">{aircraftInfo.engineType}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-default-600">Aircraft Category</label>
                    <p className="font-medium">{aircraftInfo.aircraftCategory}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Engines</label>
                    <p className="font-medium">{aircraftInfo.engines}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Seats Number</label>
                    <p className="font-medium">{aircraftInfo.seatsNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Speed</label>
                    <p className="font-medium">{aircraftInfo.speed}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Location</label>
                    {isEditing ? (
                      <Select
                        selectedKeys={[aircraftInfo.location.toLowerCase().replace(' ', '-')]}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0];
                          const location = locations.find(l => l.value === value)?.label || value;
                          updateField('location', location);
                        }}
                        className="mt-1"
                      >
                        {locations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <p className="font-medium">{aircraftInfo.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-default-600">Rate</label>
                    {isEditing ? (
                      <Input
                        value={aircraftInfo.rate}
                        onChange={(e) => updateField('rate', e.target.value)}
                        placeholder="Enter hourly rate"
                        startContent="$"
                        endContent="/hr"
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{aircraftInfo.rate}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Requirements Section */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Requirements</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-default-600">Pilot Rating Required</label>
                  {isEditing ? (
                    <Select
                      selectedKeys={[aircraftInfo.pilotRatingRequired.toLowerCase()]}
                      onSelectionChange={(keys) => updateField('pilotRatingRequired', Array.from(keys)[0])}
                      className="mt-1"
                    >
                      {ratingOptions.map((rating) => (
                        <SelectItem key={rating.value} value={rating.value}>
                          {rating.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    <p className="font-medium">{aircraftInfo.pilotRatingRequired}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-default-600">Instructor Rating Required</label>
                  {isEditing ? (
                    <Select
                      selectedKeys={[aircraftInfo.instructorRatingRequired.toLowerCase()]}
                      onSelectionChange={(keys) => updateField('instructorRatingRequired', Array.from(keys)[0])}
                      className="mt-1"
                    >
                      {ratingOptions.map((rating) => (
                        <SelectItem key={rating.value} value={rating.value}>
                          {rating.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    <p className="font-medium">{aircraftInfo.instructorRatingRequired}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-default-600">Medical Certificate Required</label>
                  {isEditing ? (
                    <Select
                      selectedKeys={[aircraftInfo.medicalCertificateRequired.toLowerCase()]}
                      onSelectionChange={(keys) => updateField('medicalCertificateRequired', Array.from(keys)[0])}
                      className="mt-1"
                    >
                      {medicalOptions.map((medical) => (
                        <SelectItem key={medical.value} value={medical.value}>
                          {medical.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    <p className="font-medium">{aircraftInfo.medicalCertificateRequired}</p>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Endorsements Section */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Endorsements</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <Checkbox
                  isSelected={aircraftInfo.endorsements.complex}
                  onValueChange={(value) => updateEndorsement('complex', value)}
                  isDisabled={!isEditing}
                >
                  Complex
                </Checkbox>
                <Checkbox
                  isSelected={aircraftInfo.endorsements.highPerformance}
                  onValueChange={(value) => updateEndorsement('highPerformance', value)}
                  isDisabled={!isEditing}
                >
                  High Performance
                </Checkbox>
                <Checkbox
                  isSelected={aircraftInfo.endorsements.tailwheel}
                  onValueChange={(value) => updateEndorsement('tailwheel', value)}
                  isDisabled={!isEditing}
                >
                  Tailwheel
                </Checkbox>
                <Checkbox
                  isSelected={aircraftInfo.endorsements.highAltitudeOperations}
                  onValueChange={(value) => updateEndorsement('highAltitudeOperations', value)}
                  isDisabled={!isEditing}
                >
                  High Altitude Operations
                </Checkbox>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column - Additional Information */}
        <div className="space-y-6">
          {/* Aircraft Inspections */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Aircraft Inspections</h3>
              </div>
              <Button
                size="sm"
                color="success"
                variant="flat"
                startContent={<Settings className="w-4 h-4" />}
              >
                Manage
              </Button>
            </CardHeader>
            <CardBody>
              <p className="text-default-500 text-center py-4">
                No inspections defined
              </p>
            </CardBody>
          </Card>

          {/* Aircraft Meters */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Aircraft Meters</h3>
              </div>
              <Button
                size="sm"
                color="success"
                variant="flat"
                startContent={<Eye className="w-4 h-4" />}
              >
                View
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-default-600">Hobbs</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{aircraftInfo.meters.hobbs}</span>
                    <Button isIconOnly size="sm" variant="light">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-600">Engine 1</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{aircraftInfo.meters.engine1}</span>
                    <Button isIconOnly size="sm" variant="light">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Aircraft Discrepancies */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold">Aircraft Discrepancies</h3>
              </div>
              <Button
                size="sm"
                color="success"
                variant="flat"
                startContent={<Eye className="w-4 h-4" />}
              >
                View
              </Button>
            </CardHeader>
            <CardBody>
              <p className="text-default-500 text-center py-4">
                No discrepancies defined
              </p>
            </CardBody>
          </Card>

          {/* Weight and Balance */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Weight and Balance</h3>
              </div>
              <Button
                size="sm"
                color="success"
                variant="flat"
                startContent={<Settings className="w-4 h-4" />}
                onPress={() => navigate(`/weight-balance/${id}`)}
              >
                Manage
              </Button>
            </CardHeader>
            <CardBody>
              <p className="text-default-500 text-center py-4">
                No weight and balance data
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Aircraft
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete aircraft <strong>{aircraftInfo.name}</strong>? 
                  This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="danger" 
                  onPress={() => {
                    onClose();
                    navigate("/resources");
                  }}
                >
                  Delete Aircraft
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
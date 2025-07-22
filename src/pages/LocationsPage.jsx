import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Checkbox,
  useDisclosure,
  Breadcrumbs,
  BreadcrumbItem,
  Tooltip
} from "@heroui/react";
import { Home, MapPin, Edit2, Plus, LayoutDashboard } from "lucide-react";

const locations = [
  { id: 1, name: 'Farmingdale', code: 'FRG', country: 'United States', state: 'NY', timezone: 'America/New_York' },
  { id: 2, name: 'New York', code: 'LGA', country: 'United States', state: 'NY', timezone: 'America/New_York' },
  { id: 3, name: 'Днепро', code: 'KBP', country: 'Ukraine', state: 'DN', timezone: 'Europe/Kiev' },
  { id: 4, name: 'Офис', code: '###', country: 'Russia', state: 'MS', timezone: 'Europe/Moscow' },
  { id: 5, name: 'Штаб', code: 'SDAS', country: 'Kazakhstan', state: 'AL', timezone: 'Asia/Almaty' },
];

const services = [
  { label: 'Aircraft Inspection', value: 'inspection' },
  { label: 'Aircraft Rental', value: 'rental' },
  { label: 'Flight Training', value: 'flight_training' },
  { label: 'Ground Training', value: 'ground_training' },
  { label: 'Repair Airframe', value: 'repair_airframe' },
  { label: 'Repair Powerplant', value: 'repair_powerplant' },
  { label: 'Sightseeing Tours', value: 'sightseeing' },
  { label: 'Simulator Training', value: 'simulator' },
];

const timezones = [
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Europe/Kiev', value: 'Europe/Kiev' },
  { label: 'Europe/Moscow', value: 'Europe/Moscow' },
  { label: 'Asia/Almaty', value: 'Asia/Almaty' },
];

const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Ukraine', value: 'UA' },
  { label: 'Russia', value: 'RU' },
  { label: 'Kazakhstan', value: 'KZ' },
];

export default function LocationsPage() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedServices, setSelectedServices] = React.useState([]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem startContent={<Home className="w-4 h-4" />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<LayoutDashboard className="w-4 h-4" />}>Dashboard</BreadcrumbItem>
          <BreadcrumbItem >Jet Suite</BreadcrumbItem>
          <BreadcrumbItem startContent={<MapPin className="w-4 h-4" />}>
            Locations
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <Card className="mb-8">
        <CardBody>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Locations</h1>
            <Button
              color="primary"
              endContent={<Plus className="w-4 h-4" />}
              onPress={onOpen}
            >
              Add Location
            </Button>
          </div>

          <Table aria-label="Locations table">
            <TableHeader>
              <TableColumn>LOCATION NAME</TableColumn>
              <TableColumn>CODE</TableColumn>
              <TableColumn>COUNTRY</TableColumn>
              <TableColumn>STATE</TableColumn>
              <TableColumn>TIMEZONE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>{location.code}</TableCell>
                  <TableCell>{location.country}</TableCell>
                  <TableCell>{location.state}</TableCell>
                  <TableCell>{location.timezone}</TableCell>
                  <TableCell>
                    <Tooltip content="Edit location">
                      <Button isIconOnly variant="light" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-xl font-bold">Add New Location</h2>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Location Name"
                    placeholder="Enter location name"
                    variant="bordered"
                  />
                  <Input
                    label="Airport Code"
                    placeholder="e.g., JFK"
                    variant="bordered"
                  />
                  <Select
                    label="Country"
                    placeholder="Select country"
                    variant="bordered"
                  >
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="State/Province"
                    placeholder="Enter state or province"
                    variant="bordered"
                  />
                  <Input
                    label="City"
                    placeholder="Enter city"
                    variant="bordered"
                  />
                  <Input
                    label="Zip/Postal Code"
                    placeholder="Enter zip/postal code"
                    variant="bordered"
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Address Line 1"
                      placeholder="Enter address"
                      variant="bordered"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Address Line 2"
                      placeholder="Enter additional address info"
                      variant="bordered"
                    />
                  </div>
                  <Select
                    label="Timezone"
                    placeholder="Select timezone"
                    variant="bordered"
                  >
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Coordinates"
                    placeholder="e.g., 40° 38.641', -73° 46.938'"
                    variant="bordered"
                  />
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium mb-2">Services</p>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <Checkbox
                          key={service.value}
                          value={service.value}
                          onChange={(checked) => {
                            if (checked) {
                              setSelectedServices([...selectedServices, service.value]);
                            } else {
                              setSelectedServices(selectedServices.filter(s => s !== service.value));
                            }
                          }}
                        >
                          {service.label}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                  <Input
                    label="Tax Rate (%)"
                    placeholder="Enter tax rate"
                    type="number"
                    variant="bordered"
                  />
                  <Input
                    label="Tax Name"
                    placeholder="Enter tax name"
                    variant="bordered"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add Location
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

// useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('https://api-dev-2.holdshort.com/api/v1/calendar/locations');
//         const data = await response.json();
//         setLocations(data);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchLocations();
//   }, []);

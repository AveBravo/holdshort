import React, { useState, useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
  Breadcrumbs,
  BreadcrumbItem,
  ButtonGroup,
  Chip,
  Divider,
  Spinner,
} from '@heroui/react';
import {
  Home,
  Search,
  Settings,
  MapPin,
  Plane,
  Building2,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for search results
const mockSearchData = [
  {
    id: 1,
    organizationName: 'Blue Sky Aviation',
    aircraftName: 'N123AB',
    manufacturer: 'Cessna',
    model: '172',
    city: 'Los Angeles',
    state: 'CA',
    country: 'United States',
    zipCode: '90210',
    engineType: 'piston',
    aircraftType: 'fixed wing single-engine',
    services: ['Aircraft Rental', 'Flight Training'],
    distance: 5.2,
  },
  {
    id: 2,
    organizationName: 'Helicopter Adventures',
    aircraftName: 'N456CD',
    manufacturer: 'Robinson',
    model: 'R44',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    zipCode: '94102',
    engineType: 'piston',
    aircraftType: 'rotorcraft',
    services: ['Aircraft Rental', 'Sightseeing Tours'],
    distance: 12.8,
  },
  {
    id: 3,
    organizationName: 'Metro Flight School',
    aircraftName: 'N789EF',
    manufacturer: 'Piper',
    model: 'Cherokee',
    city: 'Phoenix',
    state: 'AZ',
    country: 'United States',
    zipCode: '85001',
    engineType: 'piston',
    aircraftType: 'fixed wing single-engine',
    services: ['Flight Training', 'Ground Training'],
    distance: 25.1,
  },
];

const engineTypes = [
  { value: 'any', label: 'Any' },
  { value: 'piston', label: 'Piston' },
  { value: 'turboprop', label: 'Turboprop' },
  { value: 'turbojet', label: 'Turbojet' },
  { value: 'turbofan', label: 'Turbofan' },
  { value: 'electric', label: 'Electric' },
];

const countries = [
  { value: 'any', label: 'Any' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'UK', label: 'United Kingdom' },
];

const states = [
  { value: 'any', label: 'Any' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'AZ', label: 'Arizona' },
];

const cities = [
  { value: 'any', label: 'Any' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'new-york', label: 'New York' },
];

const serviceOptions = [
  'Aircraft Inspection',
  'Aircraft Rental',
  'Flight Training',
  'Ground Training',
  'Repair Airframe',
  'Repair Powerplant',
  'Sightseeing Tours',
  'Simulator Training',
];

const aircraftTypes = [
  'fixed wing multi-engine',
  'fixed wing single-engine',
  'glider',
  'rotorcraft',
  'balloon',
  'blimp/dirigible',
  'gyroplane',
  'helicopter',
  'powered parachute',
  'weight-shift-control',
];

const distanceOptions = [
  { value: '5', label: '5mi' },
  { value: '10', label: '10mi' },
  { value: '20', label: '20mi' },
  { value: '50', label: '50mi' },
  { value: '100', label: '100mi' },
  { value: 'no-limit', label: 'No Limit' },
];

const sortOptions = [
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
  { value: 'distance', label: 'Distance' },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedEngineType, setSelectedEngineType] = useState('any');
  const [selectedCountry, setSelectedCountry] = useState('any');
  const [selectedState, setSelectedState] = useState('any');
  const [selectedCity, setSelectedCity] = useState('any');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAircraftTypes, setSelectedAircraftTypes] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState('10');
  const [sortBy, setSortBy] = useState('distance');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Filter and sort search results
  const filteredResults = useMemo(() => {
    let results = [...mockSearchData];

    // Apply filters
    if (searchQuery.trim()) {
      results = results.filter(item =>
        item.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.aircraftName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedEngineType !== 'any') {
      results = results.filter(item => item.engineType === selectedEngineType);
    }

    if (selectedCountry !== 'any') {
      results = results.filter(item => item.country.includes(selectedCountry));
    }

    if (selectedServices.length > 0) {
      results = results.filter(item =>
        selectedServices.some(service => item.services.includes(service))
      );
    }

    if (selectedAircraftTypes.length > 0) {
      results = results.filter(item =>
        selectedAircraftTypes.includes(item.aircraftType)
      );
    }

    if (selectedDistance !== 'no-limit') {
      const maxDistance = parseInt(selectedDistance);
      results = results.filter(item => item.distance <= maxDistance);
    }

    // Apply sorting
    switch (sortBy) {
      case 'a-z':
        results.sort((a, b) => a.organizationName.localeCompare(b.organizationName));
        break;
      case 'z-a':
        results.sort((a, b) => b.organizationName.localeCompare(a.organizationName));
        break;
      case 'distance':
        results.sort((a, b) => a.distance - b.distance);
        break;
      default:
        break;
    }

    return results;
  }, [
    searchQuery,
    selectedEngineType,
    selectedCountry,
    selectedServices,
    selectedAircraftTypes,
    selectedDistance,
    sortBy,
  ]);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setSearchQuery('');
    setZipCode('');
    setSelectedEngineType('any');
    setSelectedCountry('any');
    setSelectedState('any');
    setSelectedCity('any');
    setSelectedServices([]);
    setSelectedAircraftTypes([]);
    setSelectedDistance('10');
    setSortBy('distance');
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem startContent={<Home className="w-4 h-4" />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Search className="w-4 h-4" />}>
            Search
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Find Flight Centers</h1>
          <p className="text-default-500">
            Search for organizations, aircraft, and flight training centers near you
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Search Filters</h3>
              <Button
                size="sm"
                variant="light"
                startContent={<RotateCcw className="w-4 h-4" />}
                onPress={handleReset}
              >
                Reset
              </Button>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Main Search */}
              <div className="space-y-4">
                <Input
                  label="Organization Name, Aircraft Name, Manufacturer or Model"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-default-400" />}
                />
                <Input
                  label="Zip Code"
                  placeholder="Enter zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  startContent={<MapPin className="w-4 h-4 text-default-400" />}
                />
              </div>

              <Divider />

              {/* Sort and Distance */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span>Sort by:</span>
                  <ButtonGroup size="sm">
                    {sortOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? "solid" : "bordered"}
                        color={sortBy === option.value ? "primary" : "default"}
                        onPress={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span>Distance:</span>
                  <div className="flex flex-wrap gap-1">
                    {distanceOptions.map((option) => (
                      <Button
                        key={option.value}
                        size="sm"
                        variant={selectedDistance === option.value ? "solid" : "bordered"}
                        color={selectedDistance === option.value ? "primary" : "default"}
                        onPress={() => setSelectedDistance(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Divider />

              {/* Location Filters */}
              <div className="space-y-4">
                <Select
                  label="Engine Type"
                  selectedKeys={[selectedEngineType]}
                  onSelectionChange={(keys) => setSelectedEngineType(Array.from(keys)[0])}
                >
                  {engineTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Country"
                  selectedKeys={[selectedCountry]}
                  onSelectionChange={(keys) => setSelectedCountry(Array.from(keys)[0])}
                >
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="City"
                  selectedKeys={[selectedCity]}
                  onSelectionChange={(keys) => setSelectedCity(Array.from(keys)[0])}
                >
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="State/Province"
                  selectedKeys={[selectedState]}
                  onSelectionChange={(keys) => setSelectedState(Array.from(keys)[0])}
                >
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Divider />

              {/* Services */}
              <div className="space-y-3">
                <h4 className="font-medium">Services</h4>
                <CheckboxGroup
                  value={selectedServices}
                  onValueChange={setSelectedServices}
                  classNames={{
                    wrapper: "gap-2",
                  }}
                >
                  {serviceOptions.map((service) => (
                    <Checkbox key={service} value={service} size="sm">
                      {service}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>

              <Divider />

              {/* Aircraft Type */}
              <div className="space-y-3">
                <h4 className="font-medium">Aircraft Type</h4>
                <CheckboxGroup
                  value={selectedAircraftTypes}
                  onValueChange={setSelectedAircraftTypes}
                  classNames={{
                    wrapper: "gap-2",
                  }}
                >
                  {aircraftTypes.map((type) => (
                    <Checkbox key={type} value={type} size="sm">
                      {type}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>

              {/* Search Button */}
              <Button
                color="primary"
                size="lg"
                className="w-full"
                startContent={<Search className="w-4 h-4" />}
                onPress={handleSearch}
                isLoading={isLoading}
              >
                Find
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-semibold">Search Results</h3>
                {hasSearched && (
                  <Chip color="primary" variant="flat">
                    {filteredResults.length} results found
                  </Chip>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {!hasSearched ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search className="w-16 h-16 text-default-300 mb-4" />
                  <h3 className="text-xl font-semibold text-default-500 mb-2">
                    Start Your Search
                  </h3>
                  <p className="text-default-400 max-w-md">
                    Use the filters on the left to find flight centers, aircraft, and training organizations near you.
                  </p>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Spinner size="lg" color="primary" />
                  <p className="text-default-500 mt-4">Searching...</p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-default-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-default-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-default-500 mb-2">
                    Can't find anything. Try other search options
                  </h3>
                  <p className="text-default-400 max-w-md mb-4">
                    Try adjusting your search criteria or expanding your search radius.
                  </p>
                  <Button
                    variant="bordered"
                    startContent={<RotateCcw className="w-4 h-4" />}
                    onPress={handleReset}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <Card
                      key={result.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      isPressable
                    >
                      <CardBody>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Building2 className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1">
                                  {result.organizationName}
                                </h4>
                                <div className="flex items-center gap-2 mb-2">
                                  <Plane className="w-4 h-4 text-default-400" />
                                  <span className="text-sm text-default-600">
                                    {result.aircraftName} - {result.manufacturer} {result.model}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                  <MapPin className="w-4 h-4 text-default-400" />
                                  <span className="text-sm text-default-600">
                                    {result.city}, {result.state} {result.zipCode}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {result.services.map((service) => (
                                    <Chip
                                      key={service}
                                      size="sm"
                                      variant="flat"
                                      color="primary"
                                    >
                                      {service}
                                    </Chip>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Chip color="success" variant="flat">
                              {result.distance} mi away
                            </Chip>
                            <div className="flex gap-2">
                              <Button size="sm" variant="bordered">
                                View Details
                              </Button>
                              <Button size="sm" color="primary">
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
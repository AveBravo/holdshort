import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  RadioGroup,
  Radio,
  Checkbox,
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
  Scale,
  X,
  Plus,
  Trash2,
  Edit,
  Save,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const initialWeightBalanceData = {
  basicEmptyWeight: { weight: '0.00', arm: '0.00' },
  maximumRampWeight: { weight: '0.00', arm: '0.00' },
  maximumTakeoffWeight: { weight: '0.00', arm: '0.00' },
  maximumLandingWeight: { weight: '0.00', arm: '0.00' },
  rows: [
    { id: 1, name: '', seats: 3, arm: '0.00' },
    { id: 2, name: '', seats: 3, arm: '0.00' },
    { id: 3, name: '', seats: 3, arm: '0.00' },
  ],
  fuel: {
    consumption: '0.00',
    density: '0.00',
    reserve: '34.00',
    tankType: 'static',
    movePilotSeat: false,
    capacity: '0.00',
    arm: '0.00',
  },
  envelopeImage: null,
};

export default function WeightBalancePage() {
    const { id } = useParams();
    const navigate = useNavigate();
  const [data, setData] = React.useState(initialWeightBalanceData);
  const [nextRowId, setNextRowId] = React.useState(4);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = React.useRef(null);

  const updateWeightBalance = (field, subfield, value) => {
    setData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subfield]: value
      }
    }));
  };

  const updateFuel = (field, value) => {
    setData(prev => ({
      ...prev,
      fuel: {
        ...prev.fuel,
        [field]: value
      }
    }));
  };

  const updateRow = (id, field, value) => {
    setData(prev => ({
      ...prev,
      rows: prev.rows.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    }));
  };

  const addRow = () => {
    const newRow = {
      id: nextRowId,
      name: '',
      seats: 3,
      arm: '0.00'
    };
    setData(prev => ({
      ...prev,
      rows: [...prev.rows, newRow]
    }));
    setNextRowId(prev => prev + 1);
  };

  const deleteRow = (id) => {
    setData(prev => ({
      ...prev,
      rows: prev.rows.filter(row => row.id !== id)
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setData(prev => ({
        ...prev,
        envelopeImage: file
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving weight and balance data:', data);
    navigate(`/aircraft-details/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem 
            startContent={<Home className="w-4 h-4" />}
            onPress={() => navigate('/home')}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Building2 className="w-4 h-4" />}
            onPress={() => navigate('/organization')}
          >
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Plane className="w-4 h-4" />}
            onPress={() => navigate('/resources')}
          >
            Resources
          </BreadcrumbItem>
          <BreadcrumbItem 
            onPress={() => navigate(`/aircraft-details/${id}`)}
          >
            N133PH-49
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Scale className="w-4 h-4" />}>
            Weight & Balance
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Manage Weight & Balance</h1>
            <p className="text-default-500">Configure aircraft weight and balance parameters</p>
          </div>
        </div>
        <Button
          variant="light"
          isIconOnly
          onPress={() => navigate(`/aircraft-details/${id}`)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weight and Balance Section */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Weight and Balance</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            {/* Basic Parameters */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium text-default-600">Parameter</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium text-default-600">Weight (lbs)</div>
                  <div className="text-sm font-medium text-default-600">Arm (in)</div>
                </div>
              </div>
              
              {/* Basic Empty Weight */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm">Basic Empty Weight</span>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    size="sm"
                    value={data.basicEmptyWeight.weight}
                    onChange={(e) => updateWeightBalance('basicEmptyWeight', 'weight', e.target.value)}
                  />
                  <Input
                    size="sm"
                    value={data.basicEmptyWeight.arm}
                    onChange={(e) => updateWeightBalance('basicEmptyWeight', 'arm', e.target.value)}
                  />
                </div>
              </div>

              {/* Maximum Ramp Weight */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm">Maximum Ramp Weight</span>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    size="sm"
                    value={data.maximumRampWeight.weight}
                    onChange={(e) => updateWeightBalance('maximumRampWeight', 'weight', e.target.value)}
                  />
                  <Input
                    size="sm"
                    value={data.maximumRampWeight.arm}
                    onChange={(e) => updateWeightBalance('maximumRampWeight', 'arm', e.target.value)}
                  />
                </div>
              </div>

              {/* Maximum Takeoff Weight */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm">Maximum Takeoff Weight</span>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    size="sm"
                    value={data.maximumTakeoffWeight.weight}
                    onChange={(e) => updateWeightBalance('maximumTakeoffWeight', 'weight', e.target.value)}
                  />
                  <Input
                    size="sm"
                    value={data.maximumTakeoffWeight.arm}
                    onChange={(e) => updateWeightBalance('maximumTakeoffWeight', 'arm', e.target.value)}
                  />
                </div>
              </div>

              {/* Maximum Landing Weight */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-sm">Maximum Landing Weight</span>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    size="sm"
                    value={data.maximumLandingWeight.weight}
                    onChange={(e) => updateWeightBalance('maximumLandingWeight', 'weight', e.target.value)}
                  />
                  <Input
                    size="sm"
                    value={data.maximumLandingWeight.arm}
                    onChange={(e) => updateWeightBalance('maximumLandingWeight', 'arm', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Divider />

            {/* Add Row Button */}
            <Button
              color="success"
              variant="flat"
              startContent={<Plus className="w-4 h-4" />}
              onPress={addRow}
              size="sm"
            >
              Add Row
            </Button>

            {/* Dynamic Rows */}
            <div className="space-y-4">
              {data.rows.map((row, index) => (
                <div key={row.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{index + 1}. Row Name *</span>
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={() => deleteRow(row.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <div className="text-xs text-default-500">Row Name</div>
                      <Input
                        size="sm"
                        placeholder="1"
                        value={row.name}
                        onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-default-500">Seats</div>
                      <Input
                        size="sm"
                        type="number"
                        value={row.seats}
                        onChange={(e) => updateRow(row.id, 'seats', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-default-500">Arm (in)</div>
                      <Input
                        size="sm"
                        value={row.arm}
                        onChange={(e) => updateRow(row.id, 'arm', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Fuel Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Fuel</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Fuel Consumption (lbs/hr)"
                  value={data.fuel.consumption}
                  onChange={(e) => updateFuel('consumption', e.target.value)}
                />
                <Input
                  label="Fuel Density (lbs/gal)"
                  value={data.fuel.density}
                  onChange={(e) => updateFuel('density', e.target.value)}
                />
                <Input
                  label="Fuel Reserve (min)"
                  value={data.fuel.reserve}
                  onChange={(e) => updateFuel('reserve', e.target.value)}
                />
                
                <div>
                  <label className="text-sm font-medium text-default-700 mb-2 block">
                    Fuel Tank Type
                  </label>
                  <RadioGroup
                    orientation="horizontal"
                    value={data.fuel.tankType}
                    onValueChange={(value) => updateFuel('tankType', value)}
                  >
                    <Radio value="static">Static</Radio>
                    <Radio value="dynamic">Dynamic</Radio>
                  </RadioGroup>
                </div>

                <Checkbox
                  isSelected={data.fuel.movePilotSeat}
                  onValueChange={(value) => updateFuel('movePilotSeat', value)}
                >
                  Move pilot seat to the right side
                </Checkbox>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Capacity (gal)"
                    value={data.fuel.capacity}
                    onChange={(e) => updateFuel('capacity', e.target.value)}
                  />
                  <Input
                    label="Arm (in)"
                    value={data.fuel.arm}
                    onChange={(e) => updateFuel('arm', e.target.value)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* W&B Envelope Image */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">W&B Envelope Image</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-full p-8 border-2 border-dashed border-default-300 rounded-lg cursor-pointer hover:border-primary-300 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.classList.add('border-primary-500', 'bg-primary-50');
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
                    
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      if (file.type.startsWith('image/')) {
                        handleImageUpload({ target: { files: [file] } });
                      }
                    }
                  }}
                >
                  {data.envelopeImage ? (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-md flex items-center justify-center transition-opacity">
                        <span className="text-white font-medium">Click to change image</span>
                      </div>
                      <img 
                        src={URL.createObjectURL(data.envelopeImage)} 
                        alt="W&B Envelope" 
                        className="w-full h-auto max-h-64 object-contain rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-default-400 mx-auto mb-4" />
                      <p className="text-default-500 mb-2">Click or drag & drop to upload W&B Envelope Image</p>
                      <p className="text-xs text-default-400">Supports JPG, PNG (max 5MB)</p>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {data.envelopeImage && (
                  <div className="flex gap-2">
                    <Button
                      variant="light"
                      color="danger"
                      startContent={<Trash2 className="w-4 h-4" />}
                      onPress={() => setData(prev => ({ ...prev, envelopeImage: null }))}
                    >
                      Remove Image
                    </Button>
                    <Button
                      variant="bordered"
                      startContent={<Upload className="w-4 h-4" />}
                      onPress={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="bordered"
          startContent={<Edit className="w-4 h-4" />}
          onPress={() => navigate(`/weight-balance-envelope/${id}`)}
        >
          Edit W&B Envelope
        </Button>
        <Button
          color="success"
          startContent={<Save className="w-4 h-4" />}
          onPress={handleSave}
        >
          Save Weight & Balance
        </Button>
      </div>

      {/* Edit W&B Envelope Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit W&B Envelope
              </ModalHeader>
              <ModalBody>
                <p className="text-default-600">
                  Weight and Balance envelope editing functionality would be implemented here.
                  This could include a graphical editor for creating and modifying the envelope chart.
                </p>
                <div className="bg-default-50 p-4 rounded-lg">
                  <p className="text-sm text-default-500">
                    Feature preview: Interactive W&B envelope editor with drag-and-drop points,
                    automatic calculations, and real-time validation.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
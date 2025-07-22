import React, { useState, useMemo } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from 'next-themes';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Breadcrumbs,
  BreadcrumbItem,
  Tabs,
  Tab,
  Divider,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/react';
import {
  Home,
  Building2,
  Plane,
  Scale,
  X,
  Calculator,
  BarChart3,
  Settings,
  Save,
  AlertTriangle,
  Info,
  Plus,
  Trash2,
  Search,
} from 'lucide-react';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeightBalanceEnvelope = ({ forwardLimits, aftLimits, maxFuelPoints, minFuelPoints }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Theme-aware colors
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';
  const textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';

  // Create envelope polygon by connecting forward and aft limits
  const createEnvelopePolygon = () => {
    if (!forwardLimits.length || !aftLimits.length) return [];

    const points = [];

    // Sort forward limits by weight ascending for left boundary
    const sortedForward = [...forwardLimits].sort((a, b) => a.minWeight - b.minWeight);
    // Sort aft limits by weight ascending for right boundary  
    const sortedAft = [...aftLimits].sort((a, b) => a.minWeight - b.minWeight);

    // Create left boundary (forward limits) - bottom to top
    sortedForward.forEach(limit => {
      points.push({ x: limit.minCgLimit, y: limit.minWeight });
      if (limit.maxWeight > limit.minWeight) {
        points.push({ x: limit.maxCgLimit, y: limit.maxWeight });
      }
    });

    // Create top boundary - connect highest forward to highest aft
    const highestForward = sortedForward[sortedForward.length - 1];
    const highestAft = sortedAft[sortedAft.length - 1];
    
    if (highestAft.maxCgLimit > highestForward.maxCgLimit) {
      points.push({ x: highestAft.maxCgLimit, y: highestAft.maxWeight });
    }

    // Create right boundary (aft limits) - top to bottom
    [...sortedAft].reverse().forEach(limit => {
      if (limit.maxWeight > limit.minWeight) {
        points.push({ x: limit.maxCgLimit, y: limit.maxWeight });
      }
      points.push({ x: limit.minCgLimit, y: limit.minWeight });
    });

    // Close the polygon by connecting back to start
    if (points.length > 0) {
      points.push(points[0]);
    }

    return points;
  };
  
  const envelopePoints = createEnvelopePolygon();

  // Chart.js data object
  const data = {
    datasets: [
      {
        label: 'Weight and Balance Envelope',
        data: envelopePoints,
        showLine: true,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Max Fuel Case',
        data: maxFuelPoints,
        showLine: true,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        fill: false,
        pointStyle: 'rectRot',
        pointRadius: 6,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
      },
      {
        label: 'Min Fuel Case',
        data: minFuelPoints,
        showLine: true,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: false,
        pointStyle: 'triangle',
        pointRadius: 6,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
      },
    ],
  };

  // Chart.js options object
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Weight and Balance Envelope',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: textColor,
      },
      legend: {
        position: 'top',
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        mode: 'point',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: CG ${context.parsed.x.toFixed(2)}" | Weight ${context.parsed.y.toFixed(0)} lbs`;
          }
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'CG Limit (inches)',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: textColor,
        },
        type: 'linear',
        position: 'bottom',
        min: 120,
        max: 142,
        ticks: {
          color: textColor,
          stepSize: 2,
          callback: function(value) {
            return value;
          }
        },
        grid: {
          color: gridColor,
          lineWidth: 1,
        },
        border: {
          color: borderColor,
          width: 2,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Weight (lbs)',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: textColor,
        },
        type: 'linear',
        min: 3000,
        max: 5500,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
          lineWidth: 1,
        },
        border: {
          color: borderColor,
          width: 2,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
  };

  return <Scatter data={data} options={options} />;
};

export default function WeightBalanceEnvelopePage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [forwardLimits, setForwardLimits] = useState([
    { id: 1, minWeight: 3200, minCgLimit: 124, maxWeight: 3500, maxCgLimit: 126 },
    { id: 2, minWeight: 3500, minCgLimit: 126, maxWeight: 5350, maxCgLimit: 130 },
  ]);
  const [aftLimits, setAftLimits] = useState([
    { id: 1, minWeight: 3200, minCgLimit: 136, maxWeight: 4200, maxCgLimit: 138 },
    { id: 2, minWeight: 4200, minCgLimit: 138, maxWeight: 5350, maxCgLimit: 140 },
  ]);
  const [nextForwardId, setNextForwardId] = useState(3);
  const [nextAftId, setNextAftId] = useState(3);

  // Sample calculation data for demonstration
  const maxFuelPoints = [
    { x: 128, y: 4800 },
    { x: 129, y: 4600 },
    { x: 130, y: 4400 }
  ];

  const minFuelPoints = [
    { x: 126, y: 4000 },
    { x: 127, y: 3800 },
    { x: 128, y: 3600 }
  ];

  const updateForwardLimit = (id, field, value) => {
    setForwardLimits(prev => prev.map(limit =>
      limit.id === id ? { ...limit, [field]: parseFloat(value) || 0 } : limit
    ));
  };

  const updateAftLimit = (id, field, value) => {
    setAftLimits(prev => prev.map(limit =>
      limit.id === id ? { ...limit, [field]: parseFloat(value) || 0 } : limit
    ));
  };

  const addForwardLimit = () => {
    const newLimit = {
      id: nextForwardId,
      minWeight: 0,
      minCgLimit: 0,
      maxWeight: 0,
      maxCgLimit: 0
    };
    setForwardLimits(prev => [...prev, newLimit]);
    setNextForwardId(prev => prev + 1);
  };

  const addAftLimit = () => {
    const newLimit = {
      id: nextAftId,
      minWeight: 0,
      minCgLimit: 0,
      maxWeight: 0,
      maxCgLimit: 0
    };
    setAftLimits(prev => [...prev, newLimit]);
    setNextAftId(prev => prev + 1);
  };

  const deleteForwardLimit = (id) => {
    setForwardLimits(prev => prev.filter(limit => limit.id !== id));
  };

  const deleteAftLimit = (id) => {
    setAftLimits(prev => prev.filter(limit => limit.id !== id));
  };

  const handleSave = () => {
    console.log('Saving envelope configuration');
    onNavigate({ page: 'weight-balance' });
  };

  const handleFind = () => {
    console.log('Searching for aircraft:', searchQuery);
    // Here you would implement the search functionality
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem 
            startContent={<Home className="w-4 h-4" />}
            onPress={() => onNavigate({ page: 'home' })}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Building2 className="w-4 h-4" />}
            onPress={() => onNavigate({ page: 'organization' })}
          >
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Plane className="w-4 h-4" />}
            onPress={() => onNavigate({ page: 'resources' })}
          >
            Resources
          </BreadcrumbItem>
          <BreadcrumbItem 
            onPress={() => onNavigate({ page: 'aircraft-details' })}
          >
            N133PH-49
          </BreadcrumbItem>
          <BreadcrumbItem 
            onPress={() => onNavigate({ page: 'weight-balance' })}
          >
            Weight & Balance
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<BarChart3 className="w-4 h-4" />}>
            W&B Envelope
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Edit Weight & Balance Envelope for G</h1>
            <p className="text-default-500">Configure envelope limits and visualize on chart</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            color="success"
            startContent={<Save className="w-4 h-4" />}
            onPress={handleSave}
          >
            Save Envelope
          </Button>
          <Button
            variant="light"
            isIconOnly
            onPress={() => onNavigate({ page: 'weight-balance' })}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Search and Tables */}
        <div className="space-y-6">
          {/* Replace Envelope from Make/Model */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Replace Envelope from Make/Model</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <p className="text-sm text-default-600">Find aircraft by model name or manufacturer</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter aircraft model or manufacturer"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    color="primary"
                    onPress={handleFind}
                    startContent={<Search className="w-4 h-4" />}
                  >
                    Find
                  </Button>
                </div>
                <p className="text-xs text-default-500">
                  Don't see your aircraft model? Contact support to add it.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Forward Limits Table */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Forward Limits</h3>
              <Button
                size="sm"
                color="success"
                variant="flat"
                startContent={<Plus className="w-4 h-4" />}
                onPress={addForwardLimit}
              >
                Add row
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {forwardLimits.map((limit) => (
                  <div key={limit.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Line {limit.id}</span>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={() => deleteForwardLimit(limit.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-default-500">Min Weight</label>
                        <Input
                          size="sm"
                          type="number"
                          value={limit.minWeight.toString()}
                          onChange={(e) => updateForwardLimit(limit.id, 'minWeight', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-default-500">Min Weight CG Limit</label>
                        <Input
                          size="sm"
                          type="number"
                          step="0.01"
                          value={limit.minCgLimit.toString()}
                          onChange={(e) => updateForwardLimit(limit.id, 'minCgLimit', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-default-500">Max Weight</label>
                        <Input
                          size="sm"
                          type="number"
                          value={limit.maxWeight.toString()}
                          onChange={(e) => updateForwardLimit(limit.id, 'maxWeight', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-default-500">Max Weight CG Limit</label>
                        <Input
                          size="sm"
                          type="number"
                          step="0.01"
                          value={limit.maxCgLimit.toString()}
                          onChange={(e) => updateForwardLimit(limit.id, 'maxCgLimit', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Aft Limits Table */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Aft Limits</h3>
              <Button
                size="sm"
                color="success"
                variant="flat"
                startContent={<Plus className="w-4 h-4" />}
                onPress={addAftLimit}
              >
                Add row
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {aftLimits.map((limit) => (
                  <div key={limit.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Line {limit.id}</span>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={() => deleteAftLimit(limit.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-default-500">Min Weight</label>
                        <Input
                          size="sm"
                          type="number"
                          value={limit.minWeight.toString()}
                          onChange={(e) => updateAftLimit(limit.id, 'minWeight', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-default-500">Min Weight CG Limit</label>
                        <Input
                          size="sm"
                          type="number"
                          step="0.01"
                          value={limit.minCgLimit.toString()}
                          onChange={(e) => updateAftLimit(limit.id, 'minCgLimit', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-default-500">Max Weight</label>
                        <Input
                          size="sm"
                          type="number"
                          value={limit.maxWeight.toString()}
                          onChange={(e) => updateAftLimit(limit.id, 'maxWeight', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-default-500">Max Weight CG Limit</label>
                        <Input
                          size="sm"
                          type="number"
                          step="0.01"
                          value={limit.maxCgLimit.toString()}
                          onChange={(e) => updateAftLimit(limit.id, 'maxCgLimit', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Side - Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Weight & Balance Envelope</h3>
            </CardHeader>
            <CardBody>
              <div className="h-[600px]">
                <WeightBalanceEnvelope
                  forwardLimits={forwardLimits}
                  aftLimits={aftLimits}
                  maxFuelPoints={maxFuelPoints}
                  minFuelPoints={minFuelPoints}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
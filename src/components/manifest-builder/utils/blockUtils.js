import { v4 as uuidv4 } from 'uuid';
import { 
  Plane, 
  Clipboard, 
  Users, 
  Fuel, 
  Scale, 
  Calculator, 
  Code, 
  Home, 
  Building2, 
  FileText, 
  Save, 
  Trash2, 
  RotateCcw, 
  Printer, 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  X, 
  MapPin 
} from 'lucide-react';

/**
 * Block type definitions
 */
export const MANIFEST_BLOCKS = {
  1: {
    id: 1,
    enumString: 'flight-data',
    name: 'Flight Data',
    icon: 'Plane',
    description: 'Flight information and details',
    defaultContent: {
      startTime: '09 April 2024 9:00 AM',
      pilot: 'Amanda Brown',
      aircraft: 'EUROCOPTER EC120 KAUAI',
      runBy: 'Viktor McCartney',
      runDate: '10 May 2024 9:53 PM'
    }
  },
  2: {
    id: 2,
    enumString: 'sign',
    name: 'Input Sign',
    icon: 'Clipboard',
    description: 'Signature input field',
    defaultContent: {
      fieldName: 'Pilot Signature',
      placeholder: 'Enter input name'
    }
  },
  3: {
    id: 3,
    enumString: 'seat-map',
    name: 'Passenger Map',
    icon: 'Users',
    description: 'Visual seat layout',
    defaultContent: {
      seats: [
        { id: 1, position: 'front-left', passenger: 'Kodarevskiy Porechik' },
        { id: 2, position: 'front-right', passenger: 'Amanda Brown' },
        { id: 3, position: 'back-left', passenger: null },
        { id: 4, position: 'back-right', passenger: null }
      ]
    }
  },
  4: {
    id: 4,
    enumString: 'seat-table',
    name: 'Seat Table',
    icon: 'Users',
    description: 'Passenger seating table',
    defaultContent: {
      passengers: [
        { seat: 1, name: 'Amanda Brown', weight: 440.92 },
        { seat: 2, name: 'Kodarevskiy Porechik', weight: 0 }
      ]
    }
  },
  5: {
    id: 5,
    enumString: 'seat-block',
    name: 'Passenger Block',
    icon: 'Users',
    description: 'Passenger information block',
    defaultContent: {
      pilot: 'Amanda Brown',
      passengers: ['Kodarevskiy Porechik'],
      totalPassengers: 1,
      totalCrew: 1
    }
  },
  6: {
    id: 6,
    enumString: 'fuel-data',
    name: 'Fuel Data',
    icon: 'Fuel',
    description: 'Fuel information and calculations',
    defaultContent: {
      fuelLoad: 0.00,
      fuelWeight: 0.00,
      duration: '1:00'
    }
  },
  7: {
    id: 7,
    enumString: 'weight-balance-envelope',
    name: 'W&B Schema',
    icon: 'Scale',
    description: 'Weight and balance envelope chart',
    defaultContent: {
      chartType: 'envelope',
      maxWeight: 3000,
      cgLimits: { forward: 85, aft: 95 }
    }
  },
  8: {
    id: 8,
    enumString: 'weight-balance',
    name: 'Weight Table',
    icon: 'Calculator',
    description: 'Weight and balance calculations',
    defaultContent: {
      basicEmptyWeight: 3070.00,
      pilot: 0.00,
      frontPassengers: 440.92,
      rearPassengers: 0.00,
      takeoffWeight: 3510.92,
      landingWeight: 3188.32
    }
  },
  9: {
    id: 9,
    enumString: 'custom-html',
    name: 'Two Columns',
    icon: 'Code',
    description: 'Custom HTML component with two columns',
    defaultContent: {
      leftColumn: [],
      rightColumn: []
    }
  }
};

/**
 * Creates a new block instance
 * @param {number} blockId - The ID of the block type to create
 * @returns {import('../types/manifestTypes').Block} A new block instance
 */
export const createBlock = (blockId) => {
  const blockDef = MANIFEST_BLOCKS[blockId];
  if (!blockDef) {
    throw new Error(`Block with ID ${blockId} not found`);
  }

  return {
    ...blockDef,
    instanceId: uuidv4(),
    params: { ...blockDef.defaultContent },
    children: blockId === 9 ? [[], []] : undefined
  };
};

/**
 * Gets the icon component for a block
 * @param {string} iconName - The name of the icon
 * @returns {React.ComponentType<{className?: string}>} The icon component
 */
export const getIconComponent = (iconName) => {
  const icons = {
    Plane,
    Clipboard,
    Users,
    Fuel,
    Scale,
    Calculator,
    Code,
    Home,
    Building2,
    FileText,
    Save,
    Trash2,
    RotateCcw,
    Printer,
    GripVertical,
    ChevronUp,
    ChevronDown,
    Plus,
    X,
    MapPin
  };

  return icons[iconName] || null;
};

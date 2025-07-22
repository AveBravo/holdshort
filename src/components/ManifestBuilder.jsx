import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Breadcrumbs,
  BreadcrumbItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from '@heroui/react';
import {
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
  Users,
  Plane,
  Scale,
  MapPin,
  Calculator,
  Code,
  Fuel,
  Clipboard,
} from 'lucide-react';

// Manifest block definitions
const MANIFEST_BLOCKS = {
  1: {
    id: 1,
    enumString: 'flight-data',
    name: 'Flight Data',
    icon: <Plane className="w-5 h-5" />,
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
    icon: <Clipboard className="w-5 h-5" />,
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
    icon: <Users className="w-5 h-5" />,
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
    icon: <Users className="w-5 h-5" />,
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
    icon: <Users className="w-5 h-5" />,
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
    icon: <Fuel className="w-5 h-5" />,
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
    icon: <Scale className="w-5 h-5" />,
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
    icon: <Calculator className="w-5 h-5" />,
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
    icon: <Code className="w-5 h-5" />,
    description: 'Custom HTML component with two columns',
    defaultContent: {
      leftColumn: [],
      rightColumn: []
    }
  }
};

// Column Drop Zone Component
const ColumnDropZone = ({ children, onDrop, onDragOver, columnType, isEmpty }) => {
  return (
    <div
      className={`min-h-[200px] border-2 border-dashed rounded-lg p-3 transition-colors ${
        isEmpty 
          ? 'border-default-300 bg-default-50 dark:bg-default-100 h-[200px]' 
          : 'border-transparent bg-transparent'
      }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, columnType)}
    >
      {isEmpty ? (
        <div className="flex items-center justify-center h-full text-center">
          <div>
            <Plus className="w-8 h-8 text-default-400 mx-auto mb-2" />
            <p className="text-sm text-default-500">
              Drop blocks here or click to add
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

// Block component renderers
const BlockRenderer = ({ 
  block, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown, 
  canMoveUp, 
  canMoveDown, 
  isInColumn = false,
  onAddToColumn,
  draggedBlock
}) => {
  const renderBlockContent = () => {
    switch (block.enumString) {
      case 'flight-data':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Flight Info</h3>
            <div className="text-sm space-y-1">
              <p><strong>Start time:</strong> {block.params?.startTime || block.defaultContent?.startTime}</p>
              <p><strong>Pilot:</strong> {block.params?.pilot || block.defaultContent?.pilot}</p>
              <p><strong>Aircraft:</strong> {block.params?.aircraft || block.defaultContent?.aircraft}</p>
              <p><strong>Run by:</strong> {block.params?.runBy || block.defaultContent?.runBy}</p>
              <p><strong>Run date:</strong> {block.params?.runDate || block.defaultContent?.runDate}</p>
            </div>
          </div>
        );

      case 'sign':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Input Sign</h3>
            <Input
              placeholder={block.params?.placeholder || block.defaultContent?.placeholder}
              variant="bordered"
              size="sm"
            />
          </div>
        );

      case 'seat-map':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Passenger Map</h3>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2 max-w-[200px]">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded text-xs text-center text-blue-900 dark:text-blue-100">Kodarevskiy Porechik</div>
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded text-xs text-center text-blue-900 dark:text-blue-100">Amanda Brown</div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs text-center text-gray-700 dark:text-gray-300">Empty</div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs text-center text-gray-700 dark:text-gray-300">Empty</div>
              </div>
            </div>
          </div>
        );

      case 'weight-balance':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Weight Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 p-1 text-left">Item</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-1">Weight (lbs)</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-1">Arm (in)</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-1">Moment (lbs x in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-1">Basic Empty Weight</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">3,070.00</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">141.70</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">435,019.00</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-1">Front Passengers</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">440.92</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">87.50</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">38,580.50</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 p-1 font-semibold">Takeoff Weight & CG</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right font-semibold">3,510.92</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right font-semibold">134.98</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-1 text-right font-semibold">473,599.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'weight-balance-envelope':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">W&B Schema</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg h-32 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Weight & Balance Chart</p>
            </div>
          </div>
        );

      case 'seat-block':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Passenger Block</h3>
            <div className="text-sm space-y-1">
              <p><strong>Pilot:</strong> Amanda Brown</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Seat 2: Kodarevskiy Porechik</div>
                <div>Seat 1: 440.92</div>
                <div>Seat 5: Empty seat</div>
                <div>Seat 4: Empty seat</div>
              </div>
              <p className="text-xs">Total Passengers: 1, Total Crew: 1</p>
            </div>
          </div>
        );

      case 'fuel-data':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Fuel Data</h3>
            <div className="text-sm space-y-1">
              <p><strong>Fuel Load:</strong> {block.params?.fuelLoad || block.defaultContent?.fuelLoad} lbs</p>
              <p><strong>Fuel Weight:</strong> {block.params?.fuelWeight || block.defaultContent?.fuelWeight} lbs</p>
              <p><strong>Duration:</strong> {block.params?.duration || block.defaultContent?.duration}</p>
            </div>
          </div>
        );

      case 'custom-html':
        const leftColumnBlocks = block.children?.[0] || [];
        const rightColumnBlocks = block.children?.[1] || [];

        const handleColumnDragOver = (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = 'copy';
        };

        const handleColumnDrop = (e, columnType) => {
          e.preventDefault();
          e.stopPropagation();
          
          if (draggedBlock && MANIFEST_BLOCKS[draggedBlock] && onAddToColumn) {
            onAddToColumn(block.instanceId, columnType, draggedBlock);
          }
        };

        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Two Columns</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-center">Left Column</h4>
                <ColumnDropZone
                  onDragOver={handleColumnDragOver}
                  onDrop={handleColumnDrop}
                  columnType="left"
                  isEmpty={leftColumnBlocks.length === 0}
                >
                  {leftColumnBlocks.map((childBlock, index) => (
                    <div key={childBlock.instanceId} className="bg-background dark:bg-default-100 p-2 rounded border border-default-200 dark:border-default-300 group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <BlockRenderer
                            block={childBlock}
                            isInColumn={true}
                            onRemove={() => {
                              const newChildren = [...(block.children || [[], []])];
                              newChildren[0] = newChildren[0].filter(b => b.instanceId !== childBlock.instanceId);
                              onUpdate({ children: newChildren });
                            }}
                            onMoveUp={() => {
                              if (index > 0) {
                                const newChildren = [...(block.children || [[], []])];
                                const leftCol = [...newChildren[0]];
                                [leftCol[index], leftCol[index - 1]] = [leftCol[index - 1], leftCol[index]];
                                newChildren[0] = leftCol;
                                onUpdate({ children: newChildren });
                              }
                            }}
                            onMoveDown={() => {
                              if (index < leftColumnBlocks.length - 1) {
                                const newChildren = [...(block.children || [[], []])];
                                const leftCol = [...newChildren[0]];
                                [leftCol[index], leftCol[index + 1]] = [leftCol[index + 1], leftCol[index]];
                                newChildren[0] = leftCol;
                                onUpdate({ children: newChildren });
                              }
                            }}
                            canMoveUp={index > 0}
                            canMoveDown={index < leftColumnBlocks.length - 1}
                          />
                        </div>
                        <div className="flex flex-col gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Tooltip content="Move Up">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => {
                                if (index > 0) {
                                  const newChildren = [...(block.children || [[], []])];
                                  const leftCol = [...newChildren[0]];
                                  [leftCol[index], leftCol[index - 1]] = [leftCol[index - 1], leftCol[index]];
                                  newChildren[0] = leftCol;
                                  onUpdate({ children: newChildren });
                                }
                              }}
                              isDisabled={index === 0}
                            >
                              <ChevronUp className="w-3 h-3" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Move Down">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => {
                                if (index < leftColumnBlocks.length - 1) {
                                  const newChildren = [...(block.children || [[], []])];
                                  const leftCol = [...newChildren[0]];
                                  [leftCol[index], leftCol[index + 1]] = [leftCol[index + 1], leftCol[index]];
                                  newChildren[0] = leftCol;
                                  onUpdate({ children: newChildren });
                                }
                              }}
                              isDisabled={index === leftColumnBlocks.length - 1}
                            >
                              <ChevronDown className="w-3 h-3" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Remove">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="danger"
                              onPress={() => {
                                const newChildren = [...(block.children || [[], []])];
                                newChildren[0] = newChildren[0].filter(b => b.instanceId !== childBlock.instanceId);
                                onUpdate({ children: newChildren });
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                </ColumnDropZone>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-center">Right Column</h4>
                <ColumnDropZone
                  onDragOver={handleColumnDragOver}
                  onDrop={handleColumnDrop}
                  columnType="right"
                  isEmpty={rightColumnBlocks.length === 0}
                >
                  {rightColumnBlocks.map((childBlock, index) => (
                    <div key={childBlock.instanceId} className="bg-background dark:bg-default-100 p-2 rounded border border-default-200 dark:border-default-300 group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <BlockRenderer
                            block={childBlock}
                            isInColumn={true}
                            onRemove={() => {
                              const newChildren = [...(block.children || [[], []])];
                              newChildren[1] = newChildren[1].filter(b => b.instanceId !== childBlock.instanceId);
                              onUpdate({ children: newChildren });
                            }}
                            onMoveUp={() => {
                              if (index > 0) {
                                const newChildren = [...(block.children || [[], []])];
                                const rightCol = [...newChildren[1]];
                                [rightCol[index], rightCol[index - 1]] = [rightCol[index - 1], rightCol[index]];
                                newChildren[1] = rightCol;
                                onUpdate({ children: newChildren });
                              }
                            }}
                            onMoveDown={() => {
                              if (index < rightColumnBlocks.length - 1) {
                                const newChildren = [...(block.children || [[], []])];
                                const rightCol = [...newChildren[1]];
                                [rightCol[index], rightCol[index + 1]] = [rightCol[index + 1], rightCol[index]];
                                newChildren[1] = rightCol;
                                onUpdate({ children: newChildren });
                              }
                            }}
                            canMoveUp={index > 0}
                            canMoveDown={index < rightColumnBlocks.length - 1}
                          />
                        </div>
                        <div className="flex flex-col gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Tooltip content="Move Up">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => {
                                if (index > 0) {
                                  const newChildren = [...(block.children || [[], []])];
                                  const rightCol = [...newChildren[1]];
                                  [rightCol[index], rightCol[index - 1]] = [rightCol[index - 1], rightCol[index]];
                                  newChildren[1] = rightCol;
                                  onUpdate({ children: newChildren });
                                }
                              }}
                              isDisabled={index === 0}
                            >
                              <ChevronUp className="w-3 h-3" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Move Down">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => {
                                if (index < rightColumnBlocks.length - 1) {
                                  const newChildren = [...(block.children || [[], []])];
                                  const rightCol = [...newChildren[1]];
                                  [rightCol[index], rightCol[index + 1]] = [rightCol[index + 1], rightCol[index]];
                                  newChildren[1] = rightCol;
                                  onUpdate({ children: newChildren });
                                }
                              }}
                              isDisabled={index === rightColumnBlocks.length - 1}
                            >
                              <ChevronDown className="w-3 h-3" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Remove">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="danger"
                              onPress={() => {
                                const newChildren = [...(block.children || [[], []])];
                                newChildren[1] = newChildren[1].filter(b => b.instanceId !== childBlock.instanceId);
                                onUpdate({ children: newChildren });
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                </ColumnDropZone>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{MANIFEST_BLOCKS[block.id]?.name || 'Unknown Block'}</h3>
            <p className="text-sm text-default-500">Block content will be rendered here</p>
          </div>
        );
    }
  };

  return (
    <Card className={`mb-4 group ${isInColumn ? 'shadow-sm' : ''}`}>
      <CardBody className={`${isInColumn ? 'p-2' : 'p-4'}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {renderBlockContent()}
          </div>
          {!isInColumn && (
            <div className="flex flex-col gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Tooltip content="Move Up">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={onMoveUp}
                  isDisabled={!canMoveUp}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Tooltip content="Move Down">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={onMoveDown}
                  isDisabled={!canMoveDown}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Tooltip content="Remove">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={onRemove}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default function ManifestBuilder({ onNavigate }) {
  const [manifestBlocks, setManifestBlocks] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const { isOpen: isUnsavedModalOpen, onOpen: onUnsavedModalOpen, onClose: onUnsavedModalClose } = useDisclosure();
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Handle drag and drop
  const handleDragStart = (e, blockId) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedBlock && MANIFEST_BLOCKS[draggedBlock]) {
      const newBlock = {
        ...MANIFEST_BLOCKS[draggedBlock],
        instanceId: Date.now() + Math.random(),
        params: { ...MANIFEST_BLOCKS[draggedBlock].defaultContent },
        children: draggedBlock === 9 ? [[], []] : undefined // Initialize columns for Two Columns block
      };
      setManifestBlocks(prev => [...prev, newBlock]);
      setHasUnsavedChanges(true);
    }
    setDraggedBlock(null);
  };

  // Block management functions
  const addBlock = (blockId) => {
    if (MANIFEST_BLOCKS[blockId]) {
      const newBlock = {
        ...MANIFEST_BLOCKS[blockId],
        instanceId: Date.now() + Math.random(),
        params: { ...MANIFEST_BLOCKS[blockId].defaultContent },
        children: blockId === 9 ? [[], []] : undefined // Initialize columns for Two Columns block
      };
      setManifestBlocks(prev => [...prev, newBlock]);
      setHasUnsavedChanges(true);
    }
  };

  const addBlockToColumn = (parentInstanceId, columnType, blockId) => {
    if (MANIFEST_BLOCKS[blockId]) {
      const newBlock = {
        ...MANIFEST_BLOCKS[blockId],
        instanceId: Date.now() + Math.random(),
        params: { ...MANIFEST_BLOCKS[blockId].defaultContent }
      };

      setManifestBlocks(prev => 
        prev.map(block => {
          if (block.instanceId === parentInstanceId && block.enumString === 'custom-html') {
            const newChildren = [...(block.children || [[], []])];
            const columnIndex = columnType === 'left' ? 0 : 1;
            newChildren[columnIndex] = [...newChildren[columnIndex], newBlock];
            return { ...block, children: newChildren };
          }
          return block;
        })
      );
      setHasUnsavedChanges(true);
    }
    setDraggedBlock(null);
  };

  const removeBlock = (instanceId) => {
    setManifestBlocks(prev => prev.filter(block => block.instanceId !== instanceId));
    setHasUnsavedChanges(true);
  };

  const moveBlock = (instanceId, direction) => {
    setManifestBlocks(prev => {
      const blocks = [...prev];
      const index = blocks.findIndex(block => block.instanceId === instanceId);
      if (index === -1) return blocks;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= blocks.length) return blocks;

      [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
      setHasUnsavedChanges(true);
      return blocks;
    });
  };

  const updateBlock = (instanceId, updates) => {
    setManifestBlocks(prev => 
      prev.map(block => 
        block.instanceId === instanceId 
          ? { ...block, ...updates }
          : block
      )
    );
    setHasUnsavedChanges(true);
  };

  const clearManifest = () => {
    setManifestBlocks([]);
    setHasUnsavedChanges(true);
  };

  const saveManifest = () => {
    // Here you would call the API: org/saveManifest/id
    console.log('Saving manifest:', manifestBlocks);
    setHasUnsavedChanges(false);
    // Simulate API call
    setTimeout(() => {
      alert('Manifest saved successfully!');
    }, 500);
  };

  const revertToDefault = () => {
    // Here you would call the API: org/getManifest/id to get default
    setManifestBlocks([]);
    setHasUnsavedChanges(false);
  };

  const printManifest = () => {
    window.print();
  };

  // Handle navigation with unsaved changes
  const handleNavigation = (route) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(route);
      onUnsavedModalOpen();
    } else {
      onNavigate(route);
    }
  };

  const confirmNavigation = (save = false) => {
    if (save) {
      saveManifest();
    }
    onUnsavedModalClose();
    if (pendingNavigation) {
      onNavigate(pendingNavigation);
    }
  };

  // Prevent navigation with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem 
            startContent={<Home className="w-4 h-4" />}
            onPress={() => handleNavigation({ page: 'home' })}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Building2 className="w-4 h-4" />}
            onPress={() => handleNavigation({ page: 'organization' })}
          >
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<FileText className="w-4 h-4" />}>
            Manifest Builder
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manifest Builder</h1>
          <p className="text-default-500">
            Customize your organization's manifest by dragging blocks from the left panel. Use Two Columns to create side-by-side layouts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            color="danger"
            variant="light"
            startContent={<Trash2 className="w-4 h-4" />}
            onPress={clearManifest}
          >
            Clear
          </Button>
          <Button
            color="warning"
            variant="light"
            startContent={<RotateCcw className="w-4 h-4" />}
            onPress={revertToDefault}
          >
            Default
          </Button>
          <Button
            variant="bordered"
            startContent={<Printer className="w-4 h-4" />}
            onPress={printManifest}
          >
            Print
          </Button>
          <Button
            color="primary"
            startContent={<Save className="w-4 h-4" />}
            onPress={saveManifest}
          >
            Save
            {hasUnsavedChanges && <span className="ml-1">*</span>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Available Blocks */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Available Blocks</h3>
            </CardHeader>
            <CardBody className="space-y-2">
              {Object.values(MANIFEST_BLOCKS).map((block) => (
                <Card
                  key={block.id}
                  className="cursor-grab active:cursor-grabbing hover:bg-default-100 transition-colors"
                  isPressable
                  draggable
                  onDragStart={(e) => handleDragStart(e, block.id)}
                  onPress={() => addBlock(block.id)}
                >
                  <CardBody className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        {block.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{block.name}</p>
                        <p className="text-xs text-default-500">{block.description}</p>
                      </div>
                      <GripVertical className="w-4 h-4 text-default-400" />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Right Panel - Manifest Preview */}
        <div className="lg:col-span-3">
          <Card className="min-h-[800px]">
            <CardHeader className="bg-primary text-white">
              <div className="w-full text-center">
                <h2 className="text-xl font-bold">New holdshort</h2>
                <p className="text-sm opacity-90">Organization Manifest</p>
              </div>
            </CardHeader>
            <CardBody
              className="p-6"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {manifestBlocks.length === 0 ? (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-default-300 rounded-lg min-h-[400px]">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-default-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-default-600 mb-2">
                      Drag blocks here to build your manifest
                    </p>
                    <p className="text-default-500">
                      Select blocks from the left panel and drag them here, or click to add them
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {manifestBlocks.map((block, index) => (
                    <BlockRenderer
                      key={block.instanceId}
                      block={block}
                      draggedBlock={draggedBlock}
                      onUpdate={(updates) => updateBlock(block.instanceId, updates)}
                      onRemove={() => removeBlock(block.instanceId)}
                      onMoveUp={() => moveBlock(block.instanceId, 'up')}
                      onMoveDown={() => moveBlock(block.instanceId, 'down')}
                      onAddToColumn={addBlockToColumn}
                      canMoveUp={index > 0}
                      canMoveDown={index < manifestBlocks.length - 1}
                    />
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Unsaved Changes Modal */}
      <Modal isOpen={isUnsavedModalOpen} onClose={onUnsavedModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Unsaved Changes
              </ModalHeader>
              <ModalBody>
                <p>
                  You have unsaved changes to your manifest. Do you want to save them before leaving?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={() => confirmNavigation(false)}
                >
                  Don't Save
                </Button>
                <Button 
                  color="default" 
                  variant="light" 
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => confirmNavigation(true)}
                >
                  Save & Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
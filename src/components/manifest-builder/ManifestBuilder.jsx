import React, { useCallback, useEffect, useState } from 'react';
import { 
  Button, 
  Breadcrumbs, 
  BreadcrumbItem, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from '@heroui/react';
import { getIconComponent } from './utils/blockUtils';
import { useManifestState } from './hooks/useManifestState';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useUnsavedChanges } from './hooks/useUnsavedChanges';
import BlockPalette from './BlockPalette';
import ManifestPreview from './ManifestPreview';

// Icons
const HomeIcon = getIconComponent('Home');
const BuildingIcon = getIconComponent('Building2');
const FileTextIcon = getIconComponent('FileText');
const SaveIcon = getIconComponent('Save');
const TrashIcon = getIconComponent('Trash2');
const RefreshIcon = getIconComponent('RotateCcw');
const PrinterIcon = getIconComponent('Printer');

/**
 * Main Manifest Builder Component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation handler
 * @returns {JSX.Element} ManifestBuilder component
 */
const ManifestBuilder = ({ onNavigate }) => {
  // State management
  const {
    blocks,
    hasUnsavedChanges,
    addBlock,
    addBlockToColumn,
    removeBlock,
    moveBlock,
    updateBlock,
    clearManifest,
    resetManifest,
    saveManifest
  } = useManifestState();

  // Drag and drop functionality
  const {
    draggedBlock,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop
  } = useDragAndDrop();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Handle unsaved changes
  const handleBeforeUnload = useCallback((e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
  }, [hasUnsavedChanges]);

  useUnsavedChanges(hasUnsavedChanges, handleBeforeUnload);

  // Navigation handlers
  const handleNavigation = useCallback((route) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(route);
      onOpen();
    } else {
      onNavigate(route);
    }
  }, [hasUnsavedChanges, onNavigate, onOpen]);

  const confirmNavigation = useCallback(async (shouldSave = false) => {
    if (shouldSave) {
      await saveManifest();
    }
    onClose();
    
    if (pendingNavigation) {
      onNavigate(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [onClose, onNavigate, pendingNavigation, saveManifest]);

  // Handle adding a block
  const handleAddBlock = useCallback((blockId) => {
    addBlock(blockId);
  }, [addBlock]);

  // Handle saving the manifest
  const handleSaveManifest = useCallback(async () => {
    try {
      await saveManifest();
      // Show success message or notification
      console.log('Manifest saved successfully');
    } catch (error) {
      console.error('Failed to save manifest:', error);
      // Show error message or notification
    }
  }, [saveManifest]);

  // Handle clearing the manifest
  const handleClearManifest = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the manifest? This cannot be undone.')) {
      clearManifest();
    }
  }, [clearManifest]);

  // Handle resetting to default
  const handleResetManifest = useCallback(() => {
    if (window.confirm('Are you sure you want to reset to default? This will discard all changes.')) {
      resetManifest();
    }
  }, [resetManifest]);

  // Handle printing
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem 
            startContent={<HomeIcon className="w-4 h-4" />}
            onPress={() => handleNavigation({ page: 'home' })}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<BuildingIcon className="w-4 h-4" />}
            onPress={() => handleNavigation({ page: 'organization' })}
          >
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<FileTextIcon className="w-4 h-4" />}>
            Manifest Builder
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manifest Builder</h1>
          <p className="text-default-500">
            Customize your organization's manifest by dragging blocks from the left panel. 
            Use Two Columns to create side-by-side layouts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            color="danger"
            variant="light"
            startContent={<TrashIcon className="w-4 h-4" />}
            onPress={handleClearManifest}
            aria-label="Clear manifest"
          >
            Clear
          </Button>
          <Button
            color="warning"
            variant="light"
            startContent={<RefreshIcon className="w-4 h-4" />}
            onPress={handleResetManifest}
            aria-label="Reset to default"
          >
            Default
          </Button>
          <Button
            variant="bordered"
            startContent={<PrinterIcon className="w-4 h-4" />}
            onPress={handlePrint}
            aria-label="Print manifest"
          >
            Print
          </Button>
          <Button
            color="primary"
            startContent={<SaveIcon className="w-4 h-4" />}
            onPress={handleSaveManifest}
            aria-label="Save manifest"
          >
            Save
            {hasUnsavedChanges && <span className="ml-1">*</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Block Palette */}
        <div className="lg:col-span-1">
          <BlockPalette 
            onAddBlock={handleAddBlock}
            onDragStart={handleDragStart}
          />
        </div>

        {/* Right Panel - Manifest Preview */}
        <div className="lg:col-span-3">
          <ManifestPreview
            blocks={blocks}
            onAddBlock={handleAddBlock}
            onRemoveBlock={removeBlock}
            onMoveBlock={moveBlock}
            onUpdateBlock={updateBlock}
            onAddToColumn={addBlockToColumn}
            draggedBlock={draggedBlock}
          />
        </div>
      </div>

      {/* Unsaved Changes Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
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
              aria-label="Discard changes"
            >
              Don't Save
            </Button>
            <Button 
              color="default" 
              variant="light" 
              onPress={onClose}
              aria-label="Cancel navigation"
            >
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={() => confirmNavigation(true)}
              aria-label="Save and continue"
            >
              Save & Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManifestBuilder;

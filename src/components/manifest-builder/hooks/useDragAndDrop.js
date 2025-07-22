import { useState, useCallback } from 'react';

/**
 * Custom hook for handling drag and drop functionality
 * @returns {Object} Drag and drop state and handlers
 */
const useDragAndDrop = () => {
  const [draggedBlock, setDraggedBlock] = useState(null);

  /**
   * Handle drag start event
   * @param {React.DragEvent} e - The drag event
   * @param {number} blockId - The ID of the block being dragged
   */
  const handleDragStart = useCallback((e, blockId) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = 'copy';
    
    // For better visual feedback
    e.dataTransfer.setData('text/plain', `block-${blockId}`);
    
    // Add a class to the dragged element
    if (e.currentTarget) {
      e.currentTarget.classList.add('opacity-50');
    }
  }, []);

  /**
   * Handle drag over event
   * @param {React.DragEvent} e - The drag over event
   */
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    
    // Add visual feedback for drop target
    if (e.currentTarget) {
      e.currentTarget.classList.add('ring-2', 'ring-primary-500');
    }
  }, []);

  /**
   * Handle drag leave event
   * @param {React.DragEvent} e - The drag leave event
   */
  const handleDragLeave = useCallback((e) => {
    // Remove visual feedback when leaving drop target
    if (e.currentTarget) {
      e.currentTarget.classList.remove('ring-2', 'ring-primary-500');
    }
  }, []);

  /**
   * Handle drag end event
   * @param {React.DragEvent} e - The drag end event
   */
  const handleDragEnd = useCallback((e) => {
    // Clean up drag feedback
    if (e.currentTarget) {
      e.currentTarget.classList.remove('opacity-50');
    }
    
    // Reset dragged block after a short delay to allow drop event to process
    setTimeout(() => {
      setDraggedBlock(null);
    }, 100);
  }, []);

  /**
   * Handle drop event for the main drop zone
   * @param {React.DragEvent} e - The drop event
   * @param {Function} onDrop - Callback to handle the drop
   */
  const handleDrop = useCallback((e, onDrop) => {
    e.preventDefault();
    
    // Remove drop target visual feedback
    if (e.currentTarget) {
      e.currentTarget.classList.remove('ring-2', 'ring-primary-500');
    }
    
    // Trigger the provided drop handler
    if (draggedBlock && onDrop) {
      onDrop(draggedBlock);
    }
    
    setDraggedBlock(null);
  }, [draggedBlock]);

  return {
    draggedBlock,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDragEnd,
    handleDrop
  };
};

export { useDragAndDrop };
export default useDragAndDrop;

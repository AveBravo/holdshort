import { useState, useCallback } from 'react';
import { createBlock } from '../utils/blockUtils';

/**
 * Custom hook for managing manifest state
 * @param {Array} initialBlocks - Initial blocks array
 * @returns {Object} Manifest state and actions
 */
const useManifestState = (initialBlocks = []) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  /**
   * Add a new block to the manifest
   * @param {number} blockId - The ID of the block to add
   */
  const addBlock = useCallback((blockId) => {
    try {
      const newBlock = createBlock(blockId);
      setBlocks(prev => [...prev, newBlock]);
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Failed to add block:', error);
    }
  }, []);

  /**
   * Add a block to a column in a two-column layout
   * @param {string} parentId - The ID of the parent block
   * @param {'left' | 'right'} columnType - The column to add to
   * @param {number} blockId - The ID of the block to add
   */
  const addBlockToColumn = useCallback((parentId, columnType, blockId) => {
    try {
      const newBlock = createBlock(blockId);
      
      setBlocks(prev => 
        prev.map(block => {
          if (block.instanceId === parentId && block.enumString === 'custom-html') {
            const newChildren = [...(block.children || [[], []])];
            const columnIndex = columnType === 'left' ? 0 : 1;
            newChildren[columnIndex] = [...newChildren[columnIndex], newBlock];
            return { ...block, children: newChildren };
          }
          return block;
        })
      );
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Failed to add block to column:', error);
    }
  }, []);

  /**
   * Remove a block from the manifest
   * @param {string} instanceId - The ID of the block to remove
   */
  const removeBlock = useCallback((instanceId) => {
    setBlocks(prev => prev.filter(block => block.instanceId !== instanceId));
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Move a block up or down in the manifest
   * @param {string} instanceId - The ID of the block to move
   * @param {'up' | 'down'} direction - The direction to move the block
   */
  const moveBlock = useCallback((instanceId, direction) => {
    setBlocks(prev => {
      const blocks = [...prev];
      const index = blocks.findIndex(block => block.instanceId === instanceId);
      
      if (index === -1) return blocks;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (newIndex < 0 || newIndex >= blocks.length) return blocks;
      
      [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
      setHasUnsavedChanges(true);
      return blocks;
    });
  }, []);

  /**
   * Update a block's properties
   * @param {string} instanceId - The ID of the block to update
   * @param {Object} updates - The updates to apply to the block
   */
  const updateBlock = useCallback((instanceId, updates) => {
    setBlocks(prev => 
      prev.map(block => 
        block.instanceId === instanceId 
          ? { ...block, ...updates }
          : block
      )
    );
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Clear all blocks from the manifest
   */
  const clearManifest = useCallback(() => {
    setBlocks([]);
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Reset the manifest to its default state
   */
  const resetManifest = useCallback(() => {
    setBlocks([]);
    setHasUnsavedChanges(false);
  }, []);

  /**
   * Save the manifest
   */
  const saveManifest = useCallback(() => {
    // In a real app, this would call an API
    console.log('Saving manifest:', blocks);
    setHasUnsavedChanges(false);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Manifest saved successfully');
        resolve();
      }, 500);
    });
  }, [blocks]);

  return {
    blocks,
    hasUnsavedChanges,
    addBlock,
    addBlockToColumn,
    removeBlock,
    moveBlock,
    updateBlock,
    clearManifest,
    resetManifest,
    saveManifest,
    setHasUnsavedChanges
  };
};

export { useManifestState };
export default useManifestState;

import React, { useCallback } from 'react';
import { Button } from '@heroui/react';
import ColumnDropZone from '../ColumnDropZone';
import BlockRenderer from '../BlockRenderer';
import { getIconComponent } from '../../utils/blockUtils';

const ChevronUpIcon = getIconComponent('ChevronUp');
const ChevronDownIcon = getIconComponent('ChevronDown');
const XIcon = getIconComponent('X');

/**
 * Two Columns Block Component
 * @param {Object} props - Component props
 * @param {Object} props.block - Block data
 * @param {Function} props.onUpdate - Update handler
 * @param {Function} props.onRemove - Remove handler
 * @param {Function} props.onMoveUp - Move up handler
 * @param {Function} props.onMoveDown - Move down handler
 * @param {boolean} props.canMoveUp - Whether the block can move up
 * @param {boolean} props.canMoveDown - Whether the block can move down
 * @param {Function} props.onAddToColumn - Add to column handler
 * @param {number} [props.draggedBlock] - Currently dragged block ID
 * @returns {JSX.Element} TwoColumns component
 */
const TwoColumns = ({
  block,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  onAddToColumn,
  draggedBlock
}) => {
  const leftColumnBlocks = block.children?.[0] || [];
  const rightColumnBlocks = block.children?.[1] || [];

  const handleColumnDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleColumnDrop = useCallback((e, columnType) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedBlock && onAddToColumn) {
      onAddToColumn(block.instanceId, columnType, draggedBlock);
    }
  }, [block.instanceId, draggedBlock, onAddToColumn]);

  const handleRemoveChild = useCallback((columnIndex, instanceId) => {
    const newChildren = [...(block.children || [[], []])];
    newChildren[columnIndex] = newChildren[columnIndex].filter(b => b.instanceId !== instanceId);
    onUpdate({ children: newChildren });
  }, [block.children, onUpdate]);

  const handleMoveChild = useCallback((columnIndex, fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    
    const newChildren = [...(block.children || [[], []])];
    const column = [...newChildren[columnIndex]];
    
    // Move item in array
    const [movedItem] = column.splice(fromIndex, 1);
    column.splice(toIndex, 0, movedItem);
    
    newChildren[columnIndex] = column;
    onUpdate({ children: newChildren });
  }, [block.children, onUpdate]);

  const renderColumn = (columnType, columnIndex) => {
    const columnBlocks = columnType === 'left' ? leftColumnBlocks : rightColumnBlocks;
    
    return (
      <div>
        <h4 className="text-sm font-medium mb-2 text-center">
          {columnType === 'left' ? 'Left' : 'Right'} Column
        </h4>
        <ColumnDropZone
          onDragOver={handleColumnDragOver}
          onDrop={(e) => handleColumnDrop(e, columnType)}
          columnType={columnType}
          isEmpty={columnBlocks.length === 0}
          isDraggingOver={draggedBlock !== null}
        >
          {columnBlocks.map((childBlock, index) => (
            <div 
              key={childBlock.instanceId} 
              className="bg-background dark:bg-default-100 p-2 rounded border border-default-200 dark:border-default-300 group"
              data-block-id={childBlock.instanceId}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <BlockRenderer
                    block={childBlock}
                    isInColumn={true}
                    onRemove={() => handleRemoveChild(columnIndex, childBlock.instanceId)}
                    onMoveUp={() => handleMoveChild(columnIndex, index, index - 1)}
                    onMoveDown={() => handleMoveChild(columnIndex, index, index + 1)}
                    canMoveUp={index > 0}
                    canMoveDown={index < columnBlocks.length - 1}
                  />
                </div>
                <div className="flex flex-col gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleMoveChild(columnIndex, index, index - 1)}
                    isDisabled={index === 0}
                    aria-label={`Move up in ${columnType} column`}
                  >
                    <ChevronUpIcon className="w-3 h-3" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleMoveChild(columnIndex, index, index + 1)}
                    isDisabled={index === columnBlocks.length - 1}
                    aria-label={`Move down in ${columnType} column`}
                  >
                    <ChevronDownIcon className="w-3 h-3" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => handleRemoveChild(columnIndex, childBlock.instanceId)}
                    aria-label={`Remove from ${columnType} column`}
                  >
                    <XIcon className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ColumnDropZone>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Two Columns</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderColumn('left', 0)}
        {renderColumn('right', 1)}
      </div>
    </div>
  );
};

export default React.memo(TwoColumns);

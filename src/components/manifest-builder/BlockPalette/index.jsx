import React, { useCallback } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { MANIFEST_BLOCKS, getIconComponent } from "../utils/blockUtils";

/**
 * Block Palette Component
 * Displays available blocks that can be added to the manifest
 * @param {Object} props - Component props
 * @param {Function} props.onAddBlock - Handler for adding a new block
 * @param {Function} props.onDragStart - Handler for drag start event
 * @returns {JSX.Element} BlockPalette component
 */
const BlockPalette = ({ onAddBlock, onDragStart }) => {
  const handleDragStart = useCallback((e, blockId) => {
    onDragStart(e, blockId);
  }, [onDragStart]);

  const handleClick = useCallback((blockId) => {
    onAddBlock(blockId);
  }, [onAddBlock]);

  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Available Blocks</h3>
      </CardHeader>
      <CardBody className="space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {Object.values(MANIFEST_BLOCKS).map((block) => {
          const BlockIcon = getIconComponent(block.icon);
          const GripIcon = getIconComponent('GripVertical');
          
          return (
            <div
              key={block.id}
              className="cursor-grab active:cursor-grabbing hover:bg-default-100 dark:hover:bg-default-800 transition-colors rounded-lg p-2"
              draggable
              onDragStart={(e) => handleDragStart(e, block.id)}
              onClick={() => handleClick(block.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick(block.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Add ${block.name} block`}
              data-block-id={block.id}
            >
              <div className="flex items-center gap-3">
                <div className="text-primary">
                  {BlockIcon && <BlockIcon className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{block.name}</p>
                  <p className="text-xs text-default-500">{block.description}</p>
                </div>
                <GripIcon className="w-4 h-4 text-default-400" />
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default React.memo(BlockPalette);

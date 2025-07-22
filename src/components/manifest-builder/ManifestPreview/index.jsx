import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import BlockRenderer from '../BlockRenderer/BlockRenderer';

/**
 * Manifest Preview Component
 * Displays the current state of the manifest being built
 * @param {Object} props - Component props
 * @param {Array} props.blocks - Array of blocks in the manifest
 * @param {Function} props.onAddBlock - Handler for adding a new block
 * @param {Function} props.onRemoveBlock - Handler for removing a block
 * @param {Function} props.onMoveBlock - Handler for moving a block
 * @param {Function} props.onUpdateBlock - Handler for updating a block
 * @param {Function} props.onAddToColumn - Handler for adding a block to a column
 * @param {number|null} props.draggedBlock - Currently dragged block ID
 * @returns {JSX.Element} ManifestPreview component
 */
const ManifestPreview = ({
  blocks = [],
  onAddBlock,
  onRemoveBlock,
  onMoveBlock,
  onUpdateBlock,
  onAddToColumn,
  draggedBlock
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedBlock) {
      onAddBlock(draggedBlock);
    }
  };

  return (
    <Card>
      <CardHeader className="bg-primary text-white">
        <div className="w-full text-center">
          <h2 className="text-xl font-bold">New holdshort</h2>
          <p className="text-sm opacity-90">Organization Manifest</p>
        </div>
      </CardHeader>
      <CardBody
        className="p-6 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {blocks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-default-300 rounded-lg min-h-[400px]">
            <div className="text-center">
              <div className="text-4xl mb-4">📄</div>
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
            {blocks.map((block, index) => (
              <BlockRenderer
                key={block.instanceId}
                block={block}
                draggedBlock={draggedBlock}
                onUpdate={(updates) => onUpdateBlock(block.instanceId, updates)}
                onRemove={() => onRemoveBlock(block.instanceId)}
                onMoveUp={() => onMoveBlock(block.instanceId, 'up')}
                onMoveDown={() => onMoveBlock(block.instanceId, 'down')}
                onAddToColumn={onAddToColumn}
                canMoveUp={index > 0}
                canMoveDown={index < blocks.length - 1}
              />
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default React.memo(ManifestPreview);

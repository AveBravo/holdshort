import React from 'react';
import { Card, CardBody, Tooltip, Button } from '@heroui/react';
import { getIconComponent } from '../utils/blockUtils';
import FlightData from './BlockTypes/FlightData';
import InputSign from './BlockTypes/InputSign';
import SeatMap from './BlockTypes/SeatMap';
import WeightBalance from './BlockTypes/WeightBalance';
import TwoColumns from './BlockTypes/TwoColumns';

const ChevronUpIcon = getIconComponent('ChevronUp');
const ChevronDownIcon = getIconComponent('ChevronDown');
const XIcon = getIconComponent('X');

/**
 * Block Renderer Component
 * Renders different block types based on the block's enumString
 * @param {import('../../types/manifestTypes').BlockRendererProps} props - Component props
 * @returns {JSX.Element} BlockRenderer component
 */
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
  // Render the appropriate block type based on enumString
  const renderBlockContent = () => {
    switch (block.enumString) {
      case 'flight-data':
        return <FlightData block={block} />;
      
      case 'sign':
        return <InputSign block={block} />;
      
      case 'seat-map':
        return <SeatMap block={block} />;
      
      case 'weight-balance':
        return <WeightBalance block={block} />;
      
      case 'custom-html':
        return (
          <TwoColumns
            block={block}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
            onAddToColumn={onAddToColumn}
            draggedBlock={draggedBlock}
          />
        );
      
      // Add more block types here as they are implemented
      
      default:
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{block.name || 'Unknown Block'}</h3>
            <p className="text-sm text-default-500">Block type "{block.enumString}" not implemented</p>
          </div>
        );
    }
  };

  // Don't wrap in Card if it's inside a column (handled by TwoColumns)
  if (isInColumn) {
    return renderBlockContent();
  }

  return (
    <Card className="mb-4 group" data-block-id={block.instanceId}>
      <CardBody className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {renderBlockContent()}
          </div>
          <div className="flex flex-col gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tooltip content="Move Up">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={onMoveUp}
                isDisabled={!canMoveUp}
                aria-label="Move block up"
              >
                <ChevronUpIcon className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Move Down">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={onMoveDown}
                isDisabled={!canMoveDown}
                aria-label="Move block down"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Remove">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={onRemove}
                aria-label="Remove block"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default React.memo(BlockRenderer);

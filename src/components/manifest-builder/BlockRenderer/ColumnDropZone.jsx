import React from 'react';
import { getIconComponent } from '../utils/blockUtils';

const PlusIcon = getIconComponent('Plus');

/**
 * Drop zone for column blocks
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Function} props.onDrop - Drop handler
 * @param {Function} props.onDragOver - Drag over handler
 * @param {'left' | 'right'} props.columnType - Type of column
 * @param {boolean} props.isEmpty - Whether the column is empty
 * @param {boolean} [props.isDraggingOver] - Whether a drag is currently over this zone
 * @returns {JSX.Element} ColumnDropZone component
 */
const ColumnDropZone = ({
  children,
  onDrop,
  onDragOver,
  columnType,
  isEmpty,
  isDraggingOver = false
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    onDrop?.(e, columnType);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver?.(e);
  };

  return (
    <div
      className={`min-h-[200px] border-2 rounded-lg p-3 transition-colors ${
        isEmpty
          ? 'border-dashed border-default-300 bg-default-50 dark:bg-default-100 h-[200px]'
          : 'border-transparent bg-transparent'
      } ${isDraggingOver ? 'ring-2 ring-primary-500' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={onDragOver} // Reset styles when leaving
      role="region"
      aria-label={`${columnType} column drop zone`}
    >
      {isEmpty ? (
        <div className="flex items-center justify-center h-full text-center">
          <div>
            <PlusIcon className="w-8 h-8 text-default-400 mx-auto mb-2" />
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

export default React.memo(ColumnDropZone);

import React from 'react';
import { Input } from '@heroui/react';

/**
 * Input Sign Block Component
 * @param {Object} props - Component props
 * @param {Object} props.block - Block data
 * @returns {JSX.Element} InputSign component
 */
const InputSign = ({ block }) => {
  const placeholder = block.params?.placeholder || block.defaultContent?.placeholder || 'Enter input name';
  const fieldName = block.params?.fieldName || block.defaultContent?.fieldName || 'Signature';

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{fieldName}</h3>
      <Input
        placeholder={placeholder}
        variant="bordered"
        size="sm"
        aria-label={fieldName}
      />
    </div>
  );
};

export default React.memo(InputSign);

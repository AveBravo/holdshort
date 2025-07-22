import React from 'react';

/**
 * Flight Data Block Component
 * @param {Object} props - Component props
 * @param {Object} props.block - Block data
 * @returns {JSX.Element} FlightData component
 */
const FlightData = ({ block }) => {
  const content = {
    startTime: block.params?.startTime || block.defaultContent?.startTime || '',
    pilot: block.params?.pilot || block.defaultContent?.pilot || '',
    aircraft: block.params?.aircraft || block.defaultContent?.aircraft || '',
    runBy: block.params?.runBy || block.defaultContent?.runBy || '',
    runDate: block.params?.runDate || block.defaultContent?.runDate || ''
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Flight Info</h3>
      <div className="text-sm space-y-1">
        <p><strong>Start time:</strong> {content.startTime}</p>
        <p><strong>Pilot:</strong> {content.pilot}</p>
        <p><strong>Aircraft:</strong> {content.aircraft}</p>
        <p><strong>Run by:</strong> {content.runBy}</p>
        <p><strong>Run date:</strong> {content.runDate}</p>
      </div>
    </div>
  );
};

export default React.memo(FlightData);

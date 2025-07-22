import React from 'react';

/**
 * Helicopter Seat Map Component
 * Displays a visual helicopter seating layout with passenger assignments
 * @param {Object} props - Component props
 * @param {Object} props.block - Block data containing seat configuration
 * @returns {JSX.Element} SeatMap component
 */
const SeatMap = ({ block }) => {
  // Use default helicopter seats if none provided in params
  const seats = block.params?.seats || block.defaultContent?.seats || [
    { id: 1, position: 'pilot', passenger: 'Amanda Brown', isPilot: true },
    { id: 2, position: 'copilot', passenger: null, isPilot: false },
    { id: 3, position: 'rear-left', passenger: 'Kodarevskiy Porechik', isPilot: false },
    { id: 4, position: 'rear-center', passenger: null, isPilot: false },
    { id: 5, position: 'rear-right', passenger: null, isPilot: false },
    { id: 6, position: 'rear-back-left', passenger: null, isPilot: false },
    { id: 7, position: 'rear-back-right', passenger: null, isPilot: false }
  ];

  // Get seat styling based on occupancy and role
  const getSeatClasses = (seat) => {
    // Handle undefined/null seat
    if (!seat) {
      return 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500';
    }
    
    if (seat.passenger) {
      return seat.isPilot 
        ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-700' 
        : 'bg-purple-500 dark:bg-purple-400 text-white border-purple-600';
    }
    return 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500';
  };

  const getSeatLabel = (position) => {
    switch (position) {
      case 'pilot':
        return 'Pilot';
      case 'copilot':
        return 'Co-Pilot';
      case 'rear-left':
        return 'Rear L';
      case 'rear-center':
        return 'Rear C';
      case 'rear-right':
        return 'Rear R';
      case 'rear-back-left':
        return 'Back L';
      case 'rear-back-right':
        return 'Back R';
      default:
        return 'Seat';
    }
  };

  // Define default seats
  const defaultSeats = [
    { id: 1, position: 'pilot', passenger: 'Amanda Brown', isPilot: true },
    { id: 2, position: 'copilot', passenger: null, isPilot: false },
    { id: 3, position: 'rear-left', passenger: 'Kodarevskiy Porechik', isPilot: false },
    { id: 4, position: 'rear-center', passenger: null, isPilot: false },
    { id: 5, position: 'rear-right', passenger: null, isPilot: false },
    { id: 6, position: 'rear-back-left', passenger: null, isPilot: false },
    { id: 7, position: 'rear-back-right', passenger: null, isPilot: false }
  ];
  
  // Use provided seats or fall back to defaults
  const allSeats = block.params?.seats || block.defaultContent?.seats || defaultSeats;
  
  // Ensure we have all required seats
  const seatMap = new Map(allSeats.map(seat => [seat.position, seat]));
  defaultSeats.forEach(defaultSeat => {
    if (!seatMap.has(defaultSeat.position)) {
      seatMap.set(defaultSeat.position, defaultSeat);
    }
  });
  
  // Convert back to array
  const processedSeats = Array.from(seatMap.values());
  
  // Categorize seats
  const pilotSeat = processedSeats.find(s => s.position === 'pilot');
  const copilotSeat = processedSeats.find(s => s.position === 'copilot');
  const rearSeats = processedSeats.filter(s => 
    s.position.startsWith('rear-') && !s.position.includes('back')
  );
  const backSeats = processedSeats.filter(s => 
    s.position.includes('back')
  );
  
  // Log for debugging
  console.log({
    allSeats: processedSeats,
    pilotSeat: pilotSeat?.position,
    copilotSeat: copilotSeat?.position,
    rearSeats: rearSeats.map(s => s.position),
    backSeats: backSeats.map(s => s.position)
  });
  
  // Get all passenger seats (excluding pilot and copilot)
  const passengerSeats = processedSeats.filter(s => 
    s.position !== 'pilot' && s.position !== 'copilot'
  );
  
  // Re-categorize seats to ensure we have all of them
  const allRearSeats = passengerSeats.filter(s => 
    s.position.startsWith('rear-') && !s.position.includes('back')
  );
  const allBackSeats = passengerSeats.filter(s => 
    s.position.includes('back')
  );
  
  // Ensure we have all rear seats
  const rearSeatPositions = ['rear-left', 'rear-center', 'rear-right'];
  const backSeatPositions = ['rear-back-left', 'rear-back-right'];
  
  // Fill in any missing rear seats
  const completeRearSeats = rearSeatPositions.map(pos => 
    allRearSeats.find(s => s.position === pos) || 
    defaultSeats.find(s => s.position === pos) ||
    { id: pos, position: pos, passenger: null, isPilot: false }
  );
  
  // Fill in any missing back seats
  const completeBackSeats = backSeatPositions.map(pos => 
    allBackSeats.find(s => s.position === pos) || 
    defaultSeats.find(s => s.position === pos) ||
    { id: pos, position: pos, passenger: null, isPilot: false }
  );
  
  // Use the complete seat lists
  const displayRearSeats = completeRearSeats;
  const displayBackSeats = completeBackSeats;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Passenger Map</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-xs">Pilot</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-xs">Passenger</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span className="text-xs">Empty</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
        <div className="relative mx-auto" style={{ width: '280px', minHeight: '300px' }}>
          {/* Cockpit Area */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center font-medium">
              COCKPIT
            </div>
            <div className="flex gap-3">
              {/* Pilot Seat */}
              <div className="relative">
                <div 
                  className={`w-16 h-12 rounded-lg border-2 flex flex-col items-center justify-center text-center transition-colors ${getSeatClasses(pilotSeat)}`}
                  title={`Pilot: ${pilotSeat?.passenger || 'Empty'}`}
                >
                  <div className="text-xs font-bold">{getSeatLabel('pilot')}</div>
                  <div className="text-xs truncate w-full px-1">
                    {pilotSeat?.passenger || 'Empty'}
                  </div>
                </div>
              </div>
              
              {/* Co-Pilot Seat */}
              <div className="relative">
                <div 
                  className={`w-16 h-12 rounded-lg border-2 flex flex-col items-center justify-center text-center transition-colors ${getSeatClasses(copilotSeat)}`}
                  title={`Co-Pilot: ${copilotSeat?.passenger || 'Empty'}`}
                >
                  <div className="text-xs font-bold">{getSeatLabel('copilot')}</div>
                  <div className="text-xs truncate w-full px-1">
                    {copilotSeat?.passenger || 'Empty'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Cabin */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center font-medium">
              PASSENGER CABIN
            </div>
            
            {/* Main Rear Row */}
            <div className="flex gap-2 mb-3 justify-center">
              {displayRearSeats.map((seat) => (
                <div key={seat.id} className="relative">
                  <div 
                    className={`w-14 h-11 rounded-lg border-2 flex flex-col items-center justify-center text-center transition-colors ${getSeatClasses(seat)}`}
                    title={`${getSeatLabel(seat.position)}: ${seat.passenger || 'Empty'}`}
                  >
                    <div className="text-xs font-bold">{getSeatLabel(seat.position)}</div>
                    <div className="text-xs truncate w-full px-1">
                      {seat.passenger || 'Empty'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back Row */}
            <div className="flex gap-2 justify-center">
              {displayBackSeats.map((seat) => (
                <div key={seat.id} className="relative">
                  <div 
                    className={`w-14 h-11 rounded-lg border-2 flex flex-col items-center justify-center text-center transition-colors ${getSeatClasses(seat)}`}
                    title={`${getSeatLabel(seat.position)}: ${seat.passenger || 'Empty'}`}
                  >
                    <div className="text-xs font-bold">{getSeatLabel(seat.position)}</div>
                    <div className="text-xs truncate w-full px-1">
                      {seat.passenger || 'Empty'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Helicopter Outline/Shape */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 280 300" fill="none" preserveAspectRatio="none">
              <path 
                d="M140,20 C200,20 260,50 260,100 C260,150 200,180 140,180 C80,180 20,150 20,100 C20,50 80,20 140,20 Z" 
                stroke="currentColor" 
                strokeWidth="1" 
                className="text-gray-300 dark:text-gray-600"
                strokeDasharray="5,5"
                opacity="0.5"
                fill="none"
              />
              <line 
                x1="260" 
                y1="100" 
                x2="300" 
                y2="100" 
                stroke="currentColor" 
                strokeWidth="1" 
                className="text-gray-300 dark:text-gray-600"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Seat Summary */}
        <div className="mt-6 pt-3 border-t border-blue-200 dark:border-blue-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Seats</div>
              <div className="text-lg font-bold">{
                1 + // pilot
                1 + // copilot
                displayRearSeats.length + 
                displayBackSeats.length
              }</div>
            </div>
            <div>
              <div className="text-sm font-medium text-purple-600 dark:text-purple-400">Occupied</div>
              <div className="text-lg font-bold">{
                (pilotSeat?.passenger ? 1 : 0) +
                (copilotSeat?.passenger ? 1 : 0) +
                displayRearSeats.filter(s => s.passenger).length + 
                displayBackSeats.filter(s => s.passenger).length
              }</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</div>
              <div className="text-lg font-bold">{
                (pilotSeat?.passenger ? 0 : 1) +
                (copilotSeat?.passenger ? 0 : 1) +
                displayRearSeats.filter(s => !s.passenger).length + 
                displayBackSeats.filter(s => !s.passenger).length
              }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SeatMap);
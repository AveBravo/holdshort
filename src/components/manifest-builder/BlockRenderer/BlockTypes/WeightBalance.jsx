import React from 'react';

/**
 * Weight Balance Block Component
 * @param {Object} props - Component props
 * @param {Object} props.block - Block data
 * @returns {JSX.Element} WeightBalance component
 */
const WeightBalance = ({ block }) => {
  // Use default values if none provided in params
  const data = {
    basicEmptyWeight: block.params?.basicEmptyWeight ?? block.defaultContent?.basicEmptyWeight ?? 3070.00,
    pilot: block.params?.pilot ?? block.defaultContent?.pilot ?? 0.00,
    frontPassengers: block.params?.frontPassengers ?? block.defaultContent?.frontPassengers ?? 0.00,
    rearPassengers: block.params?.rearPassengers ?? block.defaultContent?.rearPassengers ?? 0.00,
    takeoffWeight: block.params?.takeoffWeight ?? block.defaultContent?.takeoffWeight ?? 0.00,
    landingWeight: block.params?.landingWeight ?? block.defaultContent?.landingWeight ?? 0.00
  };

  // Format number with thousands separator
  const formatNumber = (num) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Calculate moments (simplified for example)
  const calculateMoment = (weight) => (weight * 141.7).toFixed(2);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Weight Table</h3>
      <div className="overflow-x-auto" role="region" aria-label="Weight and balance table">
        <table className="w-full text-xs border-collapse border border-gray-300 dark:border-gray-600">
          <caption className="sr-only">Weight and balance calculations</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 p-1 text-left">Item</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1">Weight (lbs)</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1">Arm (in)</th>
              <th className="border border-gray-300 dark:border-gray-600 p-1">Moment (lbs x in)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 p-1">Basic Empty Weight</td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">
                {formatNumber(data.basicEmptyWeight)}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">141.70</td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">
                {calculateMoment(data.basicEmptyWeight)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 p-1">Front Passengers</td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">
                {formatNumber(data.frontPassengers)}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">87.50</td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right">
                {calculateMoment(data.frontPassengers)}
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <td className="border border-gray-300 dark:border-gray-600 p-1 font-semibold">
                Takeoff Weight & CG
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right font-semibold">
                {formatNumber(data.takeoffWeight)}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right font-semibold">
                134.98
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-1 text-right font-semibold">
                {calculateMoment(data.takeoffWeight)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(WeightBalance);

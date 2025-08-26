import React from 'react';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';
import DispatchView from './views/DispatchView';
import StackedView from './views/StackedView';
import PilotView from './views/PilotView';

const CalendarViewRenderer = ({ 
  view, 
  currentDate, 
  events, 
  onDayClick, 
  onEventClick,
  onEventUpdate,
  filters 
}) => {
  const viewProps = {
    currentDate,
    events,
    onDayClick,
    onEventClick,
    onEventUpdate,
    filters
  };

  console.log('CalendarViewRenderer received view:', view);
  
  switch (view) {
    case 'Month View':
      return <MonthView {...viewProps} />;
    case 'Week View':
      return <WeekView {...viewProps} />;
    case 'Day View':
      return <DayView {...viewProps} />;
    case 'Dispatch View':
      return <DispatchView {...viewProps} />;
    case 'Stacked View':
      return <StackedView {...viewProps} />;
    case 'Pilot View':
      return <PilotView {...viewProps} />;
    default:
      console.log('No matching view found, defaulting to MonthView');
      return <MonthView {...viewProps} />;
  }
};

export default CalendarViewRenderer;

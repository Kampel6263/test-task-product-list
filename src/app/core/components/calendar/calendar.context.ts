import { createContext } from 'react';
import { CalendarContextModel } from './calendar.model';

/**
 * Init context
 */
const CalendarContext = createContext<CalendarContextModel>({
  calendar: [],
  onClickNext: () => {},
  onClickPrevious: () => {},
  getToday: '',
  currentMonth: ''
});

export { CalendarContext };

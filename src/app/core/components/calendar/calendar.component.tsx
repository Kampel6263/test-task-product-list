import * as React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CalendarMonthModel } from './calendar.model';
import { CalendarContext } from './calendar.context';
import { useCalendarData } from './calendar.hook';

/**
 * Renders CustomCalendar
 */
const CalendarWrapper: React.FC = ({ children }) => {
  /**
   * Hook
   */
  const { createDaysForNextMonth, createDaysForCurrentMonth, createDaysForPreviousMonth } = useCalendarData();
  /**
   * Init values
   */
  const GET_TODAY = dayjs().format('YYYY-MM-DD');
  const INITIAL_YEAR = Number(dayjs().format('YYYY'));
  const INITIAL_MONTH = Number(dayjs().format('M'));
  const DEFAULT_MONTH = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
  /**
   * Local state
   */
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);
  const [calendar, setCalendar] = useState<CalendarMonthModel[]>();
  const [displayedMonth, setDisplayedMonth] = useState('');
  /**
   * Generate calendar
   */
  const createCalendar = (year = INITIAL_YEAR, month = INITIAL_MONTH) => {
    const currentMonth = dayjs(new Date(year, month - 1)).format('MMMM YYYY');
    const currentMonthDays = createDaysForCurrentMonth(
      year,
      month,
      dayjs(`${year}-${month}-01`).daysInMonth()
    ) as CalendarMonthModel[];
    const previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays[0].date) as CalendarMonthModel[];
    const nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays.length) as CalendarMonthModel[];
    const displayCalendarDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    setDisplayedMonth(currentMonth);
    setCalendar(displayCalendarDays);
  };
  /**
   * On click events
   */
  const selectPreviousMonth = () => {
    const previousMonth = dayjs(selectedMonth).subtract(1, 'month');
    setSelectedMonth(previousMonth);
    const yearOfCurrentMonth = Number(previousMonth.format('YYYY'));
    const monthOfCurrentMonth = Number(previousMonth.format('M'));
    createCalendar(yearOfCurrentMonth, monthOfCurrentMonth);
  };

  const selectNextMonth = () => {
    const nextMonth = dayjs(selectedMonth).add(1, 'month');
    setSelectedMonth(nextMonth);
    const yearOfCurrentMonth = Number(nextMonth.format('YYYY'));
    const monthOfCurrentMonth = Number(nextMonth.format('M'));
    createCalendar(yearOfCurrentMonth, monthOfCurrentMonth);
  };
  /**
   * On mount
   */
  useEffect(() => {
    createCalendar();
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        calendar,
        currentMonth: displayedMonth,
        onClickNext: selectNextMonth,
        onClickPrevious: selectPreviousMonth,
        getToday: GET_TODAY
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarWrapper };

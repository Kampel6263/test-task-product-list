import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';
import dayOfYear from 'dayjs/plugin/dayOfYear';
/**
 * Calendar hook data
 */
const useCalendarData = () => {
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);
  dayjs.extend(dayOfYear);
  /**
   * Helpers
   */
  const getNumberOfDaysInMonth = (year: number, month: number) => dayjs(`${year}-${month}-01`).daysInMonth();
  /**
   * Get weekday
   */
  const getWeekday = (date) => dayjs(date).locale('en').weekday();
  /**
   * Get number day of week
   */
  const getNumberDayOfWeek = (date) => dayjs(date).locale('en').weekday();
  /**
   * Get day of week
   */
  const getDayOfWeek = (date) => {
    const result = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }[dayjs(date).locale('en').weekday()];
    return result;
  };

  /**
   * Get day number of year
   */
  const getDayNumberOfYear = (date) => dayjs(date).locale('en').dayOfYear();
  /**
   * Is weekend regexp
   */
  const isWeekendRegExp = /\b(Sunday|Saturday)\b/i;
  /**
   * Create days for current month
   */
  const createDaysForCurrentMonth = (year: number, month: number, getTotalDays: number) =>
    [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => ({
      date: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD'),
      dateISOString: dayjs(`${year}-${month}-${index + 1}`)
        .set('hour', 10)
        .toISOString(),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
      totalDays: getTotalDays,
      isNextMonth: false,
      isPreviousMonth: false,
      dayOfWeek: getDayOfWeek(`${year}-${month}-${index + 1}`),
      dayNumber: getNumberDayOfWeek(`${year}-${month}-${index + 1}`),
      dayNumberOfYear: getDayNumberOfYear(`${year}-${month}-${index + 1}`),
      isWeekend: isWeekendRegExp.test(getDayOfWeek(`${year}-${month}-${index + 1}`) ?? '')
    }));
  /**
   * Create days for previous month
   */
  const createDaysForPreviousMonth = (year: number, month: number, firstDayOfCurrentMont: string) => {
    const firstDayOfTheMonthWeekday = getWeekday(firstDayOfCurrentMont);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;
    const previousMonthLastMondayDayOfMonth = dayjs(firstDayOfCurrentMont)
      .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => ({
      date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`).format(
        'YYYY-MM-DD'
      ),
      dateISOString: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`)
        .set('hour', 10)
        .toISOString(),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      isPreviousMonth: true,
      isNextMonth: false,
      dayOfWeek: getDayOfWeek(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
      ),
      dayNumber: getNumberDayOfWeek(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
      ),
      dayNumberOfYear: getDayNumberOfYear(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
      ),
      isWeekend: isWeekendRegExp.test(
        getDayOfWeek(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`) ?? ''
      )
    }));
  };
  /**
   * Create days for next month
   */
  const createDaysForNextMonth = (year: number, month: number, currentMonthDaysArrayLength: number) => {
    const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDaysArrayLength}`);

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month');

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => ({
      date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format('YYYY-MM-DD'),
      dateISOString: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`)
        .set('hour', 10)
        .toISOString(),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      isNextMonth: true,
      isPreviousMonth: true,
      dayOfWeek: getDayOfWeek(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`),
      dayNumber: getNumberDayOfWeek(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`),
      dayNumberOfYear: getDayNumberOfYear(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`),
      isWeekend: isWeekendRegExp.test(getDayOfWeek(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`) ?? '')
    }));
  };

  return {
    createDaysForNextMonth,
    createDaysForCurrentMonth,
    createDaysForPreviousMonth
  };
};

export { useCalendarData };

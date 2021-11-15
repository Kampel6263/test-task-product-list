/**
 * Current month model
 */
type CalendarMonthModel = {
  /**
   * Date [YYYY-MM-DD]
   */
  date: string;
  /**
   * Day of month [11]
   */
  dayOfMonth: number;
  /**
   * Is current month
   */
  isCurrentMonth: boolean;
  /**
   * Is next month
   */
  isNextMonth: boolean;
  /**
   * Is previous month
   */
  isPreviousMonth: boolean;
  /**
   * Total days [optionally]
   */
  totalDays?: number;
  /**
   * Day of week
   */
  dayOfWeek: string;
  /**
   * Is weekend
   */
  isWeekend: boolean;
  /**
   * Date iso
   */
  dateISOString: string;
  /**
   * Day number
   */
  dayNumber: number;
  /**
   * day number of year
   */
  dayNumberOfYear: number;
};

/**
 * Calendar context model
 */
type CalendarContextModel = {
  /**
   * Calendar
   */
  calendar: CalendarMonthModel[] | undefined;
  /**
   * On click next
   */
  onClickNext: () => void;
  /**
   * On click previous
   */
  onClickPrevious: () => void;
  /**
   * Get today
   */
  getToday: string;
  /**
   * Displays current month
   */
  currentMonth: string;
};

export { CalendarMonthModel, CalendarContextModel };

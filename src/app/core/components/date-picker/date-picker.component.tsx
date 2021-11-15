import * as React from 'react';
import { FormikProperties } from '../../formik/config/formik-hoc';
import { CalendarContext } from '../calendar/calendar.context';
import { CalendarContextModel } from '../calendar/calendar.model';
import { DatePickerProps } from './date-picker.props';
import * as styles from './date-picker.scss';

/**
 * Renders DatePicker
 */
const DatePicker: React.FC<DatePickerProps & FormikProperties<any>> = ({ updateFieldValue }) => {
  const { calendar } = React.useContext<CalendarContextModel>(CalendarContext);
  if (!calendar) return <div>Loading..</div>;
  return <div className={styles.datePicker} />;
};

export { DatePicker };

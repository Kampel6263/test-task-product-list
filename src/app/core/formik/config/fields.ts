import { Checkbox, DatePicker, Input, Options, Radio, Textarea } from '../../components';
import { withField } from './formik-hoc';

const FormField = {
  Input: withField(Input),
  Textarea: withField(Textarea),
  Options: withField(Options),
  Checkbox: withField(Checkbox),
  Radio: withField(Radio),
  DatePicker: withField(DatePicker)
};

export { FormField };

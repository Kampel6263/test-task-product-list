import * as React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import { FormikProperties } from '../../formik/config/formik-hoc';
import { TextareaProps } from './textarea.props';
import * as styles from './textarea.scss';
/**
 * Renders Textarea
 */
const Textarea: React.FC<TextareaProps & FormikProperties<string>> = ({
  value,
  updateFieldValue,
  variant,
  disabled,
  error,
  placeholder,
  name
}) => {
  const [focus, setFocus] = React.useState<boolean>(false);

  return (
    <div className={(styles.container, variant)}>
      <textarea
        onChange={({ target }) => {
          updateFieldValue(target.value);
        }}
        className={classNames(styles.input, {
          [styles.inputFocused]: focus,
          [styles.inputDisabled]: disabled,
          [styles.inputError]: error
        })}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
      <ErrorMessage name={name} render={(msg) => <div className={styles.error}>{msg}</div>} />
    </div>
  );
};

export { Textarea };

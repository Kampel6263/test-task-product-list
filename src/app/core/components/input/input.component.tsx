import * as React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import * as styles from './input.scss';
import { FormikProperties } from '../../formik/config/formik-hoc';
import { InputProps } from './input.props';
/**
 * Renders Input
 */
const Input: React.FC<InputProps & FormikProperties<string>> = ({
  updateFieldValue,
  disabled = false,
  placeholder = '',
  variant,
  name,
  error,
  touched
}) => {
  const [focus, setFocus] = React.useState<boolean>(false);

  return (
    <div className={(styles.container, variant)}>
      <input
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

export { Input };

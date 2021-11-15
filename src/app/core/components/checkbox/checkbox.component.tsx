import * as React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import { useState } from 'react';
import { FormikProperties } from '../../formik/config/formik-hoc';
import { CheckboxProps } from './checkbox.props';
import * as styles from './checkbox.scss';
import { Icon } from '../icon';

/**
 * Renders Checkbox
 */
const Checkbox: React.FC<CheckboxProps & FormikProperties<boolean>> = ({
  variant,
  labelVariant,
  label,
  updateFieldValue,
  name,
  showErrorMsg = false
}) => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Handle check box submit
   */
  const toggleCheckbox = () => {
    setChecked(!checked);
    updateFieldValue(!checked);
  };

  return (
    <div className={classNames(styles.container, variant)}>
      <div
        role='checkbox'
        aria-checked='mixed'
        tabIndex={0}
        onKeyPress={() => toggleCheckbox()}
        className={classNames(styles.checkbox, {
          [styles.checkboxActive]: checked,
          [styles.checkboxError]: error
        })}
        onClick={() => toggleCheckbox()}
      >
        {checked && <Icon variant={styles.icon} name='check' onClick={() => toggleCheckbox()} />}
      </div>
      {label && <div className={classNames(styles.label, labelVariant)}>{label}</div>}
      <ErrorMessage name={name}>
        {(msg) => {
          setError(true);
          if (showErrorMsg) {
            return <div className={styles.error}>{msg}</div>;
          }
        }}
      </ErrorMessage>
    </div>
  );
};

export { Checkbox };

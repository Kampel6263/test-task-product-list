import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import { FormikProperties } from '../../formik/config/formik-hoc';
import { RadioProps } from './radio.props';
import * as styles from './radio.scss';

/**
 * Renders Radio
 */
const Radio: React.FC<RadioProps & FormikProperties<unknown>> = ({
  variant,
  labelVariant,
  label,
  name,
  updateFieldValue,
  value,
  showErrorMessage = false
}) => {
  const [error, setError] = useState(false);

  return (
    <div className={styles.container}>
      <div
        onKeyPress={() => updateFieldValue(label)}
        role='checkbox'
        aria-checked='mixed'
        tabIndex={0}
        className={classNames(styles.radio, variant, {
          [styles.radioError]: error
        })}
        onClick={() => updateFieldValue(label)}
      >
        <div className={classNames(value === label && styles.indicator)} />
      </div>
      {label && <div className={classNames(styles.label, labelVariant)}>{label}</div>}
      <ErrorMessage name={name}>
        {(msg) => {
          setError(true);
          if (showErrorMessage) {
            return <div className={styles.error}>{msg}</div>;
          }
        }}
      </ErrorMessage>
    </div>
  );
};

export { Radio };

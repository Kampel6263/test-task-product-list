import * as React from 'react';
import classNames from 'classnames';
import * as styles from './form.scss';
import { FormProps } from './form.props';

/**
 * Renders Form
 */
const Form: React.FC<FormProps> = ({ variant, handleSubmit, children, values }) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return (
    <form
      className={classNames(variant, styles.form)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit();
        }
      }}
    >
      {children}
      {!!values && isDevelopment && <div className={styles.formValues}>{JSON.stringify(values, null, 2)}</div>}
    </form>
  );
};

export { Form };

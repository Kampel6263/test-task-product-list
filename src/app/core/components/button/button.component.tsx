import * as React from 'react';
import classNames from 'classnames';
import { ButtonProps } from './button.props';
import * as styles from './button.scss';
import { capitalize } from '../../utils';
/**
 * Renders Button
 */
const Button: React.FC<ButtonProps> = ({ variant, type = 'button', children, onClick, theme = 'primary', disabled = false }) => (
  <button
    className={classNames(styles.button, variant, !disabled && styles[`theme${capitalize(theme)}`], {
      [styles.themeDisabled]: disabled
    })}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export { Button };

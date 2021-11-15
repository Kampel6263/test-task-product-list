/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import * as React from 'react';
import classNames from 'classnames';
import { IconProps } from './icon.props';
import * as styles from './icon.scss';
/**
 * Renders Icon
 */
const Icon: React.FC<IconProps> = ({ variant, name, onClick = () => {} }) => {
  return (
    <img
      className={classNames(styles.icon, variant)}
      src={require(`img/${name}`)}
      alt='icon'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

export { Icon };

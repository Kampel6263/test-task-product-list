import { State } from '@src/app/business-logic/redux/config';
import * as React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { PreloaderProps } from './preloader.props';
import * as styles from './preloader.scss';
/**
 * Renders Preloader
 */
const Preloader: React.FC<PreloaderProps> = ({ variant, isActive, preloaderId, children }) => {
  const { activePreloaders } = useSelector((state: State) => state.aui.preloaders);

  const renderPreloader = (): boolean => {
    if (isActive) return true;
    if (preloaderId && activePreloaders.includes(preloaderId)) return true;
    return false;
  };

  return renderPreloader() ? (
    <div className={classNames(styles.overlay, variant)}>
      <div className={styles.preloader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export { Preloader };

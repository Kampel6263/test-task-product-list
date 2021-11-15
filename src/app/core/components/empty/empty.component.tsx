import * as React from 'react';
import { EmptyProps } from './empty.props';
import * as styles from './empty.scss';

/**
 * Renders Empty
 */
const Empty: React.FC<EmptyProps> = () => {
  return (
    <div className={styles.empty}>
      {/* content */}
      {/* content */}
      {/* content */}
    </div>
  );
};

export { Empty };

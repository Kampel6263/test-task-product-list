import * as React from 'react';
import { Item } from './item';
import { DataProps } from './list.props';
import * as styles from './list.scss';

/**
 * Renders List
 */
const List: React.FC<DataProps> = ({ data }) => {
  return (
    <div className={styles.list}>
      {data.map((el) => (
        <div key={el.id}>
          <Item elData={el} />
        </div>
      ))}
    </div>
  );
};

export { List };

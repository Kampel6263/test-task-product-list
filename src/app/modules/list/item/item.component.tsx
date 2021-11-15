import { removeEl, setPruductView } from '@src/app/business-logic/redux/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ItemProps } from './item.props';
import * as styles from './item.scss';
import { State } from '@src/app/business-logic/redux/config';
import { useState } from 'react';

/**
 * Renders Item
 */
const Item: React.FC<ItemProps> = ({ elData }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.general);
  const [showСonfirmModal, setShowСonfirmModal] = useState(false);
  const stopP = (e) => {
    e.stopPropagation();
    setShowСonfirmModal(true);
  };
  return (
    <div className={styles.item} onClick={() => dispatch(setPruductView(elData.id))}>
      {showСonfirmModal && (
        <div className={styles.confirmModal}>
          <div className={styles.content}>
            <h2> Are you sure that you want to delete this item?</h2>
            <div className={styles.buttons}>
              <button className={styles.confirm} onClick={() => dispatch(removeEl({ id: elData.id, allData: data }))}>
                Yes
              </button>
              <button
                className={styles.cancel}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowСonfirmModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.deleteItm} onClick={(e) => stopP(e)}>
        &times;
      </div>
      <img src={elData.imageUrl} alt='' />
      <div className={styles.content}>
        <div>name: {elData.name}</div>
        <div>id: {elData.id}</div>
        <div>count: {elData.count} </div>
        <div>weight: {elData.weight} </div>
      </div>
    </div>
  );
};

export { Item };

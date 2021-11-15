import React, { FC, useEffect, useState } from 'react';
import * as styles from './home.scss';
import { HomeProps } from './home.interface';
import { useDispatch } from 'react-redux';
import { setPruductView } from '@src/app/business-logic/redux/store';
import { List } from '../list';
import { useHomeData } from './home.hook';
import { ProductView } from '../productView';
import { ModalForm } from '../modalForm';

/**
 * Renders Home
 *
 * @author Mykola Rositskyi
 * @see HomeProps
 */

const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const { data, currentPruductView } = useHomeData();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (data && data.length === 0) {
      dispatch(setPruductView(''));
    }
  }, [data]);
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.header}>
          {currentPruductView && data.length > 0 ? (
            <React.Fragment>
              <h1>Product view</h1>

              {!editMode && (
                <div className={styles.headerButtons}>
                  <button className={styles.edit} onClick={() => setEditMode(true)}>
                    Edit
                  </button>
                  <button onClick={() => dispatch(setPruductView(''))}>Close product view</button>
                </div>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1>List web app</h1>
              <button onClick={() => setShowModal(true)}>Add new item</button>
            </React.Fragment>
          )}
        </div>

        {data.length > 0 ? (
          currentPruductView ? (
            <ProductView infoData={data} id={currentPruductView} editMode={editMode} setEditMode={() => setEditMode(false)} />
          ) : (
            <List data={data} />
          )
        ) : (
          <div className={styles.empty}>
            <div>
              <img src='https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg' alt='' />
            </div>
          </div>
        )}
      </div>

      {showModal ? <ModalForm data={data} closeModal={() => setShowModal(false)} /> : null}
    </div>
  );
};

export { Home };

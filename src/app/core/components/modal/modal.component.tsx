import * as React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@src/app/business-logic/redux/config';
import { toggleModal } from '@src/app/business-logic/redux/store/aui';
import { useClickAway } from '../../utils';
import { Portal } from '../portal';
import { ModalProps } from './modal.props';
import * as styles from './modal.scss';

/**
 * Renders Modal
 */
const Modal: React.FC<ModalProps> = ({
  children,
  modalContentClassname,
  variant,
  zIndex = 1,
  isOpened = false,
  modalId,
  allowCloseOnClickAway = true
}) => {
  const ref = React.useRef(null);
  const { activeModals } = useSelector((state: State) => state.aui.modals);
  const dispatch = useDispatch();

  const renderModal = (): boolean => {
    if (isOpened) return true;
    if (activeModals.includes(modalId)) return true;
    return false;
  };

  useClickAway(
    ref,
    () => {
      dispatch(toggleModal.hide(modalId));
    },
    (allowCloseOnClickAway && renderModal()) ?? false
  );

  return renderModal() ? (
    <Portal domNode='modal-root'>
      <div className={classNames(styles.modal, variant)} style={{ zIndex }}>
        <div className={classNames(styles.modalContent, modalContentClassname)} ref={ref}>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

export { Modal };

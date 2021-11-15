import { Modals } from '@src/app/core/typescript';

/**
 * Props
 */
type ModalProps = {
  /**
   * Variant
   */
  variant?: string;
  /**
   * Modal content class name
   */
  modalContentClassname?: string;
  /**
   * Z-index
   */
  zIndex: number;
  /**
   * Is opened
   */
  isOpened?: boolean;
  /**
   * Modal id
   */
  modalId: Modals;
  /**
   * Allow close on click away
   */
  allowCloseOnClickAway?: boolean;
};

export { ModalProps };

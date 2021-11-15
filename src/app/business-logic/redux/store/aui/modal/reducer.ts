import { reducer } from 'redux-chill';
import { toggleModal } from './actions';
import { ModalState } from './state';

/**
 * modal state
 */
const modal = reducer(new ModalState())
  .on(toggleModal.show, (state, id) => {
    if (state.activeModals.some((one) => one === id)) return;
    state.activeModals.push(id);
  })
  .on(toggleModal.hide, (state, id) => {
    state.activeModals = state.activeModals.filter((item) => item !== id);
  });

export { modal };

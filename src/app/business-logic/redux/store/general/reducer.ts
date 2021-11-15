import { reducer } from 'redux-chill';
import { GeneralState } from './state';
import { getAllEl, addEl, removeEl, setPruductView, addComment, editProduct } from './actions';

/**
 * general state
 */
const general = reducer(new GeneralState())
  .on(getAllEl.submit, (state, payload) => {
    // state.data = [];

    state.data = payload;
  })
  .on(addEl.sumbit, (state, payload) => {
    state.data = payload;
  })
  .on(removeEl.submit, (state, payload) => {
    state.data = payload;
  })
  .on(setPruductView.sumbit, (state, payload) => {
    state.currentPruductView = payload;
  })
  .on(addComment.submit, (state, payload) => {
    state.data = payload;
  })
  .on(editProduct.submit, (state, payload) => {
    state.data = payload;
  });

export { general };

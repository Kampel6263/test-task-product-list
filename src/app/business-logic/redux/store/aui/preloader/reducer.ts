import { reducer } from 'redux-chill';
import { togglePreloader } from './actions';
import { PreloaderState } from './state';

/**
 * preloader state
 */
const preloader = reducer(new PreloaderState())
  .on(togglePreloader.show, (state, id) => {
    if (state.activePreloaders.some((one) => one === id)) return;
    state.activePreloaders.push(id);
  })
  .on(togglePreloader.hide, (state, id) => {
    state.activePreloaders = state.activePreloaders.filter((item) => item !== id);
  });

export { preloader };

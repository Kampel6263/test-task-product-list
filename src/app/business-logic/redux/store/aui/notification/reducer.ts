import { NotificationAnimation } from '@src/app/core/typescript';
import { reducer } from 'redux-chill';
import { toggleNotification } from './actions';
import { NotificationState } from './state';

/**
 * notification state
 */
const notification = reducer(new NotificationState())
  .on(toggleNotification.push, (state, payload) => {
    const isAlreadyExists = state.data.find((i) => i.id === payload.id);
    if (!isAlreadyExists) {
      state.data.push(payload);
    }
  })
  .on(toggleNotification.hide, (state, payload) => {
    state.data = state.data.map((i) => {
      if (i.id === payload) {
        i.animationClassname = NotificationAnimation.fadeOut;
      }
      return i;
    });
  })
  .on(toggleNotification.remove, (state, payload) => {
    state.data = state.data.filter((i) => i.id !== payload);
  });

export { notification };

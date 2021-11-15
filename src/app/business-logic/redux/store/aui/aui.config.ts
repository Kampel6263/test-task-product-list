import { combineReducers } from 'redux';
import { modal } from './modal';
import { ModalSaga } from './modal/saga';
import { notification } from './notification';
import { NotificationSaga } from './notification/saga';
import { preloader } from './preloader';
import { PreloaderSaga } from './preloader/saga';

export const AUIReducer = combineReducers({
  modals: modal,
  preloaders: preloader,
  notifications: notification
});

export const auiSagas = [new ModalSaga(), new PreloaderSaga(), new NotificationSaga()];

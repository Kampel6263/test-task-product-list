import { NotificationAnimation, NotificationModel, NotificationStatus } from '@src/app/core/typescript';
import { Saga } from 'redux-chill';
import { delay, put, takeEvery } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import { toggleNotification } from './actions';
/**
 * notification saga
 */
class NotificationSaga {
  /**
   * Handle show notification
   */
  @Saga(toggleNotification.show)
  public *toggleNotificationShow(payload: Payload<typeof toggleNotification.show>) {
    try {
      const data: NotificationModel = {
        id: uuidv4(),
        title: payload.title,
        description: payload.description,
        status: NotificationStatus[payload.status],
        animationClassname: NotificationAnimation.fadeIn
      };
      yield put(toggleNotification.push(data));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Handle hide notification
   */
  @Saga(takeEvery, toggleNotification.hide)
  public *toggleNotificationHide(payload: Payload<typeof toggleNotification.hide>) {
    try {
      yield delay(250);
      yield put(toggleNotification.remove(payload));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Handle auto remove
   */
  @Saga(takeEvery, toggleNotification.push)
  public *toggleNotificationPush(payload: Payload<typeof toggleNotification.push>) {
    try {
      yield delay(3000);
      if (payload.id) yield put(toggleNotification.hide(payload.id));
    } catch (error) {
      console.log(error);
    }
  }
}

export { NotificationSaga };

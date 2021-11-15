import { NotificationModel } from '@src/app/core/typescript';
import { make } from 'redux-chill';

const toggleNotification = make('[aui-notification] toggle notification')
  .stage('show', (payload: NotificationModel) => payload)
  .stage('hide', (payload: string) => payload)
  .stage('remove', (payload: string) => payload)
  .stage('push', (payload: NotificationModel) => payload);

export { toggleNotification };

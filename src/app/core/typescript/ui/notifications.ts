import { NotificationAnimation } from './css-animations';

enum NotificationStatus {
  default = 'default',
  info = 'info',
  error = 'error',
  success = 'successs'
}

type NotificationModel = {
  id?: string;
  title: string;
  description: string;
  status: NotificationStatus;
  animationClassname?: NotificationAnimation;
};

export { NotificationStatus, NotificationModel };

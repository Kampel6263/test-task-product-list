import { State } from '@src/app/business-logic/redux/config';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { toggleNotification } from '@src/app/business-logic/redux/store/aui';
import { Portal } from '../portal';
import { NotificationsProps } from './notifications.props';
import * as styles from './notifications.scss';
import { NotificationAnimation } from '../../typescript';
import { Icon } from '../icon';
/**
 * Renders Notification
 */
const Notifications: React.FC<NotificationsProps> = () => {
  const { data } = useSelector((state: State) => state.aui.notifications);
  const getRootElement = document.getElementById('notification-root');
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    if (getRootElement) getRootElement.className = `${styles.notificationContainer}`;
  }, []);

  /**
   * TODO: handle status as needed based on data.status received
   */

  return data.length ? (
    <Portal domNode='notification-root'>
      {data.map(({ title, description, id, animationClassname, status }) => (
        <div
          className={classNames(styles.notification, {
            [styles.fadeIn]: animationClassname === NotificationAnimation.fadeIn,
            [styles.fadeOut]: animationClassname === NotificationAnimation.fadeOut
          })}
          key={id}
        >
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <Icon
              name='icon-close'
              onClick={() => {
                if (id) dispatch(toggleNotification.hide(id));
              }}
            />
          </div>
          <div className={styles.description}>{description}</div>
        </div>
      ))}
    </Portal>
  ) : null;
};

export { Notifications };

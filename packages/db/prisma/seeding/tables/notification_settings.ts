import { NotificationType } from '../../../index';

// FIXME: i have no clue what TAB1 is supposed to be

interface INotificationSettings {
  id?: number;
  userId: string;
  type: NotificationType;
}

const NotificationSettings: INotificationSettings[] = [
  {
    userId: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    type: NotificationType.TAB1,
  },
];

export type { INotificationSettings };
export { NotificationSettings };

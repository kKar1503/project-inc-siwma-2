import { notificationtype } from '@prisma/client';

// FIXME: i have no clue what TAB1 is supposed to be

interface INotificationSettings {
  id?: number;
  user_id: string;
  type: notificationtype;
}

const NotificationSettings: INotificationSettings[] = [
  {
    user_id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    type: notificationtype.TAB1,
  },
];

export type { INotificationSettings };
export { NotificationSettings };

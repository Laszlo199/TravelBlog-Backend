import { Connection } from "mongoose";
import { NotificationSchema } from "./notification.schema";

export const NotificationProvider = [
  {
    provide: 'NOTIFICATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Notification', NotificationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
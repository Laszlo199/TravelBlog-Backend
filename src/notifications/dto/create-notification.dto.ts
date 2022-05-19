export class CreateNotificationDto{

  postName: string;

  userId: string;
  userName: string;

  notificationType: string;

  date: Date;
  //if its a comment
  comment: string;
}
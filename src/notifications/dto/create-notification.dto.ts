export class CreateNotificationDto{

  postName: string;

  userId: string;

  notificationType: string;

  date: Date;
  //if its a comment
  comment: string;
}
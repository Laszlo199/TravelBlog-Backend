import { Profile } from "../../profiles/entities/profile.entity";

export class Notification{
  postName: string;
  ownerProfile: Profile;
  eventInvokerName: string;
  notificationType: string;
  date: Date;
  text: string;
}
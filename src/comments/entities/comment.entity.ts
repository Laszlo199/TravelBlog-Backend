import { Profile } from "../../profiles/entities/profile.entity";

export class Comment {
  profile: Profile;
  username: string;
  date: Date;
  text: string;
}

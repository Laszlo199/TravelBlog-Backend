import { Comment } from '../../comments/entities/comment.entity';
import { Profile } from "../../profiles/entities/profile.entity";

export class Post {
  id: string;
  username: string;
  profile: Profile;
  title: string;
  description: string;
  text: string;
  isPrivate: boolean;
  location: string;
  date: Date;
  photo: Buffer;
  likes: string[];
  dislikes: string[];
  comments: Comment[];
}

import { Comment } from "../../comments/entities/comment.entity";

export class Post {
  id: string;
  username: string;
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

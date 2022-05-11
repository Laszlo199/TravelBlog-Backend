import { Comment } from "../../comments/entities/comment.entity";

export class Post {
  username: string;
  title: string;
  description: string;
  text: string;
  isPrivate: boolean;
  location: string;
  date: Date;
  likes: string[];
  dislikes: string[];
  comments: Comment[];
}

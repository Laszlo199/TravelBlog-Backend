import { Post } from '../../posts/entities/post.entity';

export class Profile {
  userId: string;
  username: string;
  ownPosts: Post[];
  savedPosts: Post[];
}

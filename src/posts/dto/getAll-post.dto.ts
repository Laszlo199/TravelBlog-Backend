import { Comment } from '../../comments/entities/comment.entity';
import { ApiProperty } from "@nestjs/swagger";

export class GetAllPostDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  isPrivate: boolean;
  @ApiProperty()
  location: string;
  @ApiProperty()
  date: Date;
  likes: string[];
  @ApiProperty()
  dislikes: string[];
  @ApiProperty()
  comments: Comment[];
}

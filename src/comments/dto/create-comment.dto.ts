import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  text: string;
}

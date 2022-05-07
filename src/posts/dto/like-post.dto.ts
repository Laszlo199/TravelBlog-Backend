import { ApiProperty } from "@nestjs/swagger";

export class LikePostDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  postId: string;
}
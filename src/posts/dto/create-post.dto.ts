import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty()
  userId: string;
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
}

import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto extends Document {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
}

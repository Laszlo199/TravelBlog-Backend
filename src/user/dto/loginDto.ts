import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto extends Document {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
}

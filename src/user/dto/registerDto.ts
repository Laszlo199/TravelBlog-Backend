import { Document } from 'mongoose';

export class RegisterDto extends Document {
  userName: string;
  password: string;
}

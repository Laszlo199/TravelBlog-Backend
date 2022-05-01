import { Document } from 'mongoose';

export class LoginDto extends Document {
  userName: string;
  password: string;
}

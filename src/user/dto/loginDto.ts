import { Document } from 'mongoose';

export class LoginDto extends Document {
  email: string;
  password: string;
}

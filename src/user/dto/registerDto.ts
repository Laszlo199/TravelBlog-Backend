import { Document } from 'mongoose';

export class RegisterDto extends Document {
  name: string;
  email: string;
  password: string;
}

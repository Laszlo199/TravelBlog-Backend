import * as mongoose from 'mongoose';
import { ProfileSchema } from './profile.schema';

export const CommentSchema = new mongoose.Schema({
  user: ProfileSchema,
  date: Date,
  text: String,
});

import * as mongoose from 'mongoose';
import { CommentSchema } from './comment.schema';

export const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  text: String,
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Profile',
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Profile',
  },
  //comments: [CommentSchema],
});

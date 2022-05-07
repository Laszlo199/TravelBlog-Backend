import * as mongoose from 'mongoose';
import { CommentSchema } from './comment.schema';

export const PostSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  title: String,
  description: String,
  text: String,
  isPrivate: Boolean,
  location: String,
  date: Date,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
  comments: [CommentSchema],
});

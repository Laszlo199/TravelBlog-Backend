import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  username: String,
  date: Date,
  text: String,
});

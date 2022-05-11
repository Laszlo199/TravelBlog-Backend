import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  profile: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Profile',
  },
  date: Date,
  text: String,
});

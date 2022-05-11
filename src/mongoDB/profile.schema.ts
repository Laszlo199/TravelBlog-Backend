import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema({
  userId: String,
  username: String,
  ownPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

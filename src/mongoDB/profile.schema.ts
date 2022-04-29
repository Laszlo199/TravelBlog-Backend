import * as mongoose from 'mongoose';
import { PostSchema } from "./post.schema";

export const ProfileSchema = new mongoose.Schema({
  username: String,
  ownPosts: [PostSchema],
  savedPosts: [PostSchema],
});
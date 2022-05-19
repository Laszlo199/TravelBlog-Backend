import * as mongoose from 'mongoose';
import { Profile } from "../profiles/entities/profile.entity";

export const NotificationSchema = new mongoose.Schema({
  postName: String,
  ownerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  eventInvokerName: String,

  notificationType: String,
  date: Date,

  text: String,
});



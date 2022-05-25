import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from "../mongoDB/database.module";
import { PostProvider } from "../mongoDB/post.provider";
import { ProfileProvider } from "../mongoDB/profile.provider";
import { NotificationSchema } from "../mongoDB/notification.schema";
import { NotificationProvider } from "../mongoDB/notification.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, ...PostProvider, ...ProfileProvider]
})
export class PostsModule {}

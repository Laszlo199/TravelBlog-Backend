import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from '../mongoDB/database.module';
import { CommentProvider } from '../mongoDB/comment.provider';
import { PostProvider } from "../mongoDB/post.provider";
import { ProfileProvider } from "../mongoDB/profile.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...CommentProvider, ...PostProvider, ...ProfileProvider],
})
export class CommentsModule {}

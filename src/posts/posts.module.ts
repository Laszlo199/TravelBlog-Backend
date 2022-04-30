import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from "../mongoDB/database.module";
import { PostProvider } from "../mongoDB/post.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, ...PostProvider]
})
export class PostsModule {}

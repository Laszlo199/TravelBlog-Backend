import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../mongoDB/user.schema';
import { ProfileProvider } from '../mongoDB/profile.provider';
import { UserProvider } from '../mongoDB/user.provider';
import { DatabaseModule } from '../mongoDB/database.module';
import { ProfileSchema } from "../mongoDB/profile.schema";

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...ProfileProvider, ...UserProvider],
  exports: [UserService],
})
export class UserModule {}

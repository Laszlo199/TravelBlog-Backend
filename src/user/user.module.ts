import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileProvider } from '../mongoDB/profile.provider';
import { UserProvider } from '../mongoDB/user.provider';
import { DatabaseModule } from '../mongoDB/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...ProfileProvider, ...UserProvider],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProvider } from '../mongoDB/user.provider';
import { DatabaseModule } from '../mongoDB/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...UserProvider],
  exports: [UserService],
})
export class UserModule {}

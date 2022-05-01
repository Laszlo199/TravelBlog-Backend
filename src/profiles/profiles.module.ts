import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { DatabaseModule } from '../mongoDB/database.module';
import { ProfileProvider } from '../mongoDB/profile.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, ...ProfileProvider],
})
export class ProfilesModule {}

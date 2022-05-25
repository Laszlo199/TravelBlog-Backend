import { Module } from '@nestjs/common';
import { NotificationsGateway } from "./notifications.gateway";
import { UserService } from "../user/user.service";
import { UserProvider } from "../mongoDB/user.provider";
import { ProfileProvider } from "../mongoDB/profile.provider";
import { DatabaseModule } from "../mongoDB/database.module";

@Module({
  imports: [DatabaseModule],
providers: [NotificationsGateway, UserService, ...UserProvider, ...ProfileProvider]
})
export class NotificationsModule {
}

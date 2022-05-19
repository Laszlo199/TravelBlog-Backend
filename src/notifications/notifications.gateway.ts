

import { Server } from 'socket.io';
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserService } from "../user/user.service";
@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('createNotification')
  async create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    console.log("user id in backend: " + createNotificationDto.userId);
    createNotificationDto.userName = await this.userService.getUsernameById(createNotificationDto.userId);
    console.log("username: "+ createNotificationDto.userName);
    this.server.emit(createNotificationDto.userId, createNotificationDto); //later go back to createNot.userId
  }

}
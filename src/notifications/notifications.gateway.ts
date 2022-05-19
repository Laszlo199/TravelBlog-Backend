

import { Server } from 'socket.io';
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor() {}

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    this.server.emit("6283639e5f1e8c4361970d07", createNotificationDto); //later go back to createNot.userId
  }

}
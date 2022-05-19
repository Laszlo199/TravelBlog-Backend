import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { Post } from "../posts/entities/post.entity";
import mongoose from "mongoose";
import { Profile } from "../profiles/entities/profile.entity";
import { Notification } from "../notifications/enitities/notification.entity";
import { User } from "../user/entity/User";
import { UserService } from "../user/user.service";

@Injectable()
export class CommentsService {
  constructor(@Inject('COMMENT_MODEL') private readonly commentModel: Model<Comment>,
              @Inject('POST_MODEL') private readonly postModel: Model<Post>,
              @Inject('PROFILE_MODEL') private readonly profileModel: Model<Profile>,
              @Inject('NOTIFICATION_MODEL') private readonly  notificationModel: Model<Notification>,

             ) {}

  /*
  here we will also add it to the notifications list
   */
  async create(createCommentDto: CreateCommentDto) {
    const post = await this.postModel
      .findOne({ _id: createCommentDto.postId })
      .exec();

    var  a =  post.username;
    const postOwner = await this.profileModel.findOne({a}).exec();

    const profile = await this.profileModel
      .findOne({ userId: createCommentDto.userId })
      .exec();

    if (post != null && profile != null ) {
      post.comments.push({
        profile: profile.id,
        username: profile.username,
        date: createCommentDto.date,
        text: createCommentDto.text,
      });

      this.notificationModel.create({
        postName: post.title,
        ownerProfile: postOwner,
        eventInvokerName: profile.username,
        notificationType: "comment",
        date: createCommentDto.date,
        text: createCommentDto.text /* later we can make that text shorter */
      });

      await post.save();

      return true;
    } else
      throw new HttpException(
        'No post or user found with that id',
        HttpStatus.BAD_REQUEST,
      );
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

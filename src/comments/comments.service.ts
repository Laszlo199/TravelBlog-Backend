import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { Post } from "../posts/entities/post.entity";
import mongoose from "mongoose";
import { Profile } from "../profiles/entities/profile.entity";

@Injectable()
export class CommentsService {
  constructor(@Inject('COMMENT_MODEL') private readonly commentModel: Model<Comment>,
              @Inject('POST_MODEL') private readonly postModel: Model<Post>,
              @Inject('PROFILE_MODEL') private readonly profileModel: Model<Profile>) {}

  async create(createCommentDto: CreateCommentDto) {
    const post = await this.postModel
      .findOne({ _id: createCommentDto.postId })
      .exec();
    const profile = await this.profileModel
      .findOne({ userId: createCommentDto.userId })
      .exec();

    if (post != null && profile != null) {
      post.comments.push({
        profile: profile.id,
        username: profile.username,
        date: createCommentDto.date,
        text: createCommentDto.text,
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

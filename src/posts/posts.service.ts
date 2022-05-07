import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_MODEL') private readonly postModel: Model<Post>,
    @Inject('PROFILE_MODEL') private readonly profileModel: Model<Profile>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const profile = await this.profileModel
      .findOne({ userId: createPostDto.userId })
      .exec();

    if (profile != null) {
      const newPost = new this.postModel({
        profile: profile,
        title: createPostDto.title,
        description: createPostDto.description,
        text: createPostDto.text,
        isPrivate: createPostDto.isPrivate,
        location: createPostDto.location,
        date: createPostDto.date,
        likes: [],
        dislikes: [],
        comments: [],
      });
      await newPost.save();

      profile.ownPosts.push(newPost);
      await profile.save();

      return newPost;
    } else
      throw new HttpException(
        'No profile found with that user id',
        HttpStatus.BAD_REQUEST,
      );
  }

  //finds all posts created by that user
  async findAll(userId: string) {
    const profile = await this.profileModel
      .findOne({ userId: userId })
      .populate('ownPosts')
      .exec();
    if (profile != null) {
      return profile.ownPosts.map((post) => {
        return {
          username: profile.username,
          title: post.title,
          description: post.description,
          text: post.text,
          isPrivate: post.isPrivate,
          location: post.location,
          date: post.date,
          likes: post.likes.length,
          dislikes: post.dislikes.length,
          comments: post.comments,
        }});
    } else
      throw new HttpException(
        'No profile found with that user id',
        HttpStatus.BAD_REQUEST,
      );
  }

  async findAllSaved(userId: string) {
    const profile = await this.profileModel
      .findOne({ userId: userId })
      .populate('savedPosts')
      .exec();
    if (profile != null) return profile.savedPosts;
    else
      throw new HttpException(
        'No profile found with that user id',
        HttpStatus.BAD_REQUEST,
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

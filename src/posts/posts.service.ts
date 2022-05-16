import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { LikePostDto } from './dto/like-post.dto';

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

  //returns all posts created by that user
  async findAll(userId: string) {
    const profile = await this.profileModel
      .findOne({ userId: userId })
      .populate('ownPosts')
      .exec();
    if (profile != null) {
      return profile.ownPosts.map((post) => {
        return this.postConverter(post, profile);
      });
    } else
      throw new HttpException(
        'No profile found with that user id',
        HttpStatus.BAD_REQUEST,
      );
  }

  //returns all posts liked by the user
  async findAllSaved(userId: string) {
    const profile = await this.profileModel
      .findOne({ userId: userId })
      .populate('savedPosts')
      .exec();
    if (profile != null) {
      return profile.savedPosts.map((post) => {
        return this.postConverter(post, profile);
      });
    } else
      throw new HttpException(
        'No profile found with that user id',
        HttpStatus.BAD_REQUEST,
      );
  }

  //adds a post reference to user's saved posts list
  async like(likePostDto: LikePostDto) {
    const profile = await this.profileModel
      .findOne({ userId: likePostDto.userId })
      .exec();

    const isAlreadySaved = await this.profileModel.find({
      savedPosts: likePostDto.postId,
    });

    if (isAlreadySaved.length !== 0)
      throw new HttpException(
        'User already likes this post',
        HttpStatus.CONFLICT,
      );
    else {
      const post = await this.postModel
        .findOne({ _id: likePostDto.postId })
        .exec();

      profile.savedPosts.push(post);
      await profile.save();
    }
  }

  //returns one specific post
  async findOne(id: string) {
    const post = await this.postModel.findOne({ _id: id }).exec();
    const profile = await this.profileModel.findOne({ ownPosts: id }).exec();

    if (post != null && profile != null)
      return this.postConverter(post, profile);
    else
      throw new HttpException(
        'No profile or post found',
        HttpStatus.BAD_REQUEST,
      );
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  private postConverter(post: Post, profile: Profile) {
    return {
      id: post.id,
      username: profile.username,
      title: post.title,
      description: post.description,
      text: post.text,
      isPrivate: post.isPrivate,
      location: post.location,
      date: post.date,
      likes: post.likes.length,
      dislikes: post.dislikes.length,
      comments: post.comments.map((comment) => {
        return {
          username: comment.username,
          date: comment.date,
          text: comment.text,
        };
      }),
    };
  }
}

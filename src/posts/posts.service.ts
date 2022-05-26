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
        photo: null,
        likes: [],
        dislikes: [],
        comments: [],
      });
      await newPost.save();

      profile.ownPosts.push(newPost);
      await profile.save();

      return newPost._id;
    } else
      throw new HttpException(
        'No profile found with that user id',
        HttpStatus.BAD_REQUEST,
      );
  }

  async addPhoto(file: Buffer, postId: string) {
    await this.postModel
      .findOne({ _id: postId })
      .updateOne({ photo: file })
      .exec();
    const post = await this.postModel.findOne({ _id: postId });
    return post.id;
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
  async favourite(likePostDto: LikePostDto) {
    const profile = await this.profileModel
      .findOne({ userId: likePostDto.userId })
      .exec();
    const post = await this.postModel
      .findOne({ _id: likePostDto.postId })
      .exec();
    if (profile.savedPosts.includes(post.id)) {
      await this.profileModel
        .updateOne(
          { userId: likePostDto.userId },
          { $pull: { savedPosts: likePostDto.postId } },
        )
        .exec();
      return true;
    } else {
      profile.savedPosts.push(post);
      await profile.save();
      return true;
    }
  }

  async like(likePostDto: LikePostDto) {
    return await this.thumbAction(likePostDto, true);
  }

  async dislike(likePostDto: LikePostDto) {
    return await this.thumbAction(likePostDto, false);
  }

  private async thumbAction(dto: LikePostDto, isThumbUp: boolean) {
    const post = await this.postModel
      .findOne({ _id: dto.postId })
      .populate('likes')
      .populate('dislikes')
      .exec();
    const profile = await this.profileModel
      .findOne({ userId: dto.userId })
      .exec();

    if (isThumbUp) {
      if (post.likes.includes(profile.id)) {
        await this.postModel
          .updateOne({ _id: dto.postId }, { $pull: { likes: profile.id } })
          .exec();
        return true;
      } else {
        post.likes.push(profile);
        await post.save();
        return true;
      }
    } else {
      if (post.likes.includes(profile.id)) {
        await this.postModel
          .updateOne({ _id: dto.postId }, { $pull: { likes: profile.id } })
          .exec();
        return true;
      } else {
        post.dislikes.push(profile);
        await post.save();
        return true;
      }
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

  async remove(id: string) {
    const removeOwn = await this.profileModel
      .updateOne({ ownPosts: id }, { $pull: { ownPosts: id } })
      .exec();
    const removeSaved = await this.profileModel
      .updateMany({ savedPosts: id }, { $pull: { savedPosts: id } })
      .exec();

    if (removeOwn && removeSaved) {
      const res = await this.postModel.remove({ _id: id });
      return res.deletedCount == 1;
    } else return false;
  }

  private postConverter(post: Post, profile: Profile) {
    return {
      id: post.id,
      userId: profile.userId,
      username: profile.username,
      title: post.title,
      description: post.description,
      text: post.text,
      isPrivate: post.isPrivate,
      location: post.location,
      date: post.date,
      photo: post.photo ? Buffer.from(post.photo).toString('base64') : null,
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

  async checkFavourite(likePostDto: LikePostDto) {
    const check = await this.profileModel
      .findOne({ userId: likePostDto.userId, savedPosts: likePostDto.postId })
      .exec();
    if(check==null) return false;
    return true;
  }
}

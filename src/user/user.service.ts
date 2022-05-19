import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDetails } from './user.datails.interface';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from './entity/User';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
    @Inject('PROFILE_MODEL') private readonly profileModel: Model<Profile>,
  ) {}


  _getUserDetails(user: User): UserDetails {
    return {
      id: user.id,
      userName: user.userName,
    };
  }

  async findByUserName(userName: string): Promise<User | null> {
    return this.userModel.findOne({ userName }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async getUsernameById(id:string){
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return user.userName;
  }


  async create(userName: string, hashedPassword: string): Promise<Profile> {
    const newUser = new this.userModel({
      userName,
      password: hashedPassword,
    });
    await newUser.save();

    const newProfile = new this.profileModel({
      userId: newUser._id,
      username: newUser.userName,
      ownPosts: [],
      savedPosts: [],
    });
    return newProfile.save();
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../mongoDB/user.schema';
import { UserDetails } from './user.datails.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      userName: user.userName,
    };
  }

  async findByUserName(userName: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ userName }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    userName: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      userName,
      password: hashedPassword,
    });
    return newUser.save();
  }
}

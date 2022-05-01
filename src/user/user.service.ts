import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDetails } from './user.datails.interface';
import { User } from './entity/User';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

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

  async create(userName: string, hashedPassword: string): Promise<User> {
    const newUser = new this.userModel({
      userName,
      password: hashedPassword,
    });
    return newUser.save();
  }
}

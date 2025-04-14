import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateProfileDto } from './dto/updateProfile.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserProfile(userId: string) {
    return this.userModel.findById(userId).select('-password');
  }

  async updateUserProfile(userId: string, dto: UpdateProfileDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, dto, {
      new: true,
    });
    return updatedUser;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';


import { CreatePostDto } from './dto/createPost.dto';


@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(userId: string, createPostDto: CreatePostDto) {
    const post = new this.postModel({
      ...createPostDto,
      user: userId,
    });
    return post.save();
  }

  async getPostsByUser(userId: string) {
    return this.postModel.find({ user: userId }).exec();
  }
}

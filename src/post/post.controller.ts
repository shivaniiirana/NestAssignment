import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';

import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/user/getUser.decorator';


@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('createpost')
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @CurrentUser() user: any,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.createPost(user.sub, createPostDto);
  }

  @Get('userposts')
  @UseGuards(AuthGuard('jwt'))
  async getPostsByUser(@CurrentUser() user: any) {
    return this.postService.getPostsByUser(user.sub);
  }
}

import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';

import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './getUser.decorator';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@CurrentUser() user: any) {
    return this.userService.getUserProfile(user.sub);
 
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateUserProfile(
    @CurrentUser() user: any,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateUserProfile(user.sub, dto);
  }
}

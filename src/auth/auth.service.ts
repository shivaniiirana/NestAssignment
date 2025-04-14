import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';

import * as argon2 from 'argon2';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signupWithEmail(dto: SignupDto) {
    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists) throw new UnauthorizedException('Email already exists');

    const hashedPassword = await argon2.hash(dto.password);
    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });
    
    const tokens = await this.generateTokens(user._id.toString(), user.email);
    return { user, ...tokens };
  }

  async loginWithEmail(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user || !(await argon2.verify(user.password, dto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
   
    const tokens = await this.generateTokens(user._id.toString(), user.email);
    console.log('tokens', tokens);
    console.log('logged in');
    return {  ...tokens };
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}

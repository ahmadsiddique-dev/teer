import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User, UserDocument } from './schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(payload) {
    console.log('Payload aya: ', payload);
    return this.jwtService.sign(
      {
        payload,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '1h',
      },
    );
  }

  async generateRefreshToken(payload) {
    return this.jwtService.sign(
      {
        payload,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '1h',
      },
    );
  }

  async registerUser(data: RegisterUserDto) {
    const newUser = await this.userModel.create({
      paraphrase: data.paraphrase,
      username: data.username,
      password: data.password,
      refreshToken: null
    });

    const accessToken = await this.generateAccessToken(data.username);
    const refreshToken = await this.generateRefreshToken(data.username);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return {
      accessToken,
      refreshToken,
      username: newUser.username
    };
  }

  signInUser(data: RegisterUserDto) {}
}

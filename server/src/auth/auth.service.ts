import {
    ConflictException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
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
        const doesUserExists = await this.userModel.find({
            username: data.username,
        });

        if (doesUserExists.length) {
            throw new ConflictException({
                status: HttpStatus.CONFLICT,
                success: false,
                error: 'User already exists',
            });
        }
        const newUser = await this.userModel.create({
            paraphrase: data.paraphrase,
            username: data.username,
            password: data.password,
            refreshToken: null,
        });

        const accessToken = await this.generateAccessToken(data.username);
        const refreshToken = await this.generateRefreshToken(data.username);

        if (!accessToken || !refreshToken) {
            throw new InternalServerErrorException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: 'Something went wrong while generating Tokens',
            });
        }
        newUser.refreshToken = refreshToken;
        await newUser.save();

        return {
            accessToken,
            refreshToken,
            username: newUser.username,
        };
    }

    async signInUser(data: RegisterUserDto) {
        const { username, password } = data;

        let user = await this.userModel.findOne({ username });

        if (!user) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                success: false,
                error: 'User not found',
            });
        }

        if (!(password === user.password)) {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                success: false,
                error: 'Unauthorized Access',
            });
        }

        const accessToken = await this.generateAccessToken(data.username);
        const refreshToken = await this.generateRefreshToken(data.username);

        if (!accessToken || !refreshToken) {
            throw new InternalServerErrorException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                error: 'Something went wrong.',
            });
        }
        return {
            accessToken,
            refreshToken,
            username: user.username,
        };
    } 

    async uniqueUsername({username}: {username: string}) {
        const user = await this.userModel.findOne({username}, {_id: 1});

        console.log("user: ", user)
        if (!user) {
            return true; 
        }

        return false;
    }
}

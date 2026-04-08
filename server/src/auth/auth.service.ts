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
                secret: process.env.REFRESH_TOKEN_SECRET,
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
        console.log('BData: ', username, password);

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

    async checkRefreshToken(token: string) {
        try {
            const result = await this.jwtService.verifyAsync(token, {
                secret: process.env.REFRESH_TOKEN_SECRET,
            });

            const username = result ? result?.payload : null;

            console.log("Yahaan pohncha chowk :: 01", result)
            if (!username) {
                return {
                    success: false,
                    message: "Payload missing in RefreshToken"
                }
            }

            const data = await this.userModel.findOne({ username });

            if (!data) {
                return {
                    success: false,
                    message: "User doesn't exists"
                }
            }

            const accessToken = await this.generateAccessToken(data.username);
            const refreshToken = await this.generateRefreshToken(data.username);

            data.refreshToken = refreshToken;
            await data.save()

            return {
                success: true,
                message: "ja by bhai",
                data: {accessToken, refreshToken}
            }
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Invalid Refresh token',
            };
        }
    }

    async checkAccessToken(token: string) {
        try {
            if (!token) {
                return {
                    success: false,
                    message: 'Access Token not found',
                };
            }

            const verification = await this.jwtService.verifyAsync(token, {
                secret: process.env.CCESS_TOKEN_SECRET,
            });

            if (verification) {
                return {
                    success: true,
                    message: 'Valid Access Token',
                };
            }
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong!',
            };
        }
    }

    async uniqueUsername({ username }: { username: string }) {
        const user = await this.userModel.findOne({ username }, { _id: 1 });

        console.log('user: ', user);
        if (!user) {
            return true;
        }

        return false;
    }
}

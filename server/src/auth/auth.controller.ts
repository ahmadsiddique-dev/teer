import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import * as express from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async regiserUser(
        @Body() registerUserDto: RegisterUserDto,
        @Res({ passthrough: true }) res: express.Response
    ) {
        let { accessToken, refreshToken, username } =
            await this.authService.registerUser(registerUserDto);

        if (accessToken&& accessToken) {
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
        }

        return {
            message: 'User created Successfully',
            username: username
        }
    }
}

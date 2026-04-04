import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import * as express from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async regiserUser(
        @Body() registerUserDto: RegisterUserDto,
        @Res({ passthrough: true }) res: express.Response,
    ) {
        let { accessToken, refreshToken, username } =
            await this.authService.registerUser(registerUserDto);
        if (accessToken && accessToken) {
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });
        }

        return {
            message: 'User created Successfully',
            username: username,
            success: true,
        };
    }

    @Post('login')
    async signInUser(
        @Body() registerUserDto: LoginUserDto,
        @Res({ passthrough: true }) res: express.Response,
    ) {
        const { accessToken, refreshToken, username } =
            await this.authService.signInUser(registerUserDto);

        console.log(accessToken);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        return {
            message: 'User Loggedin Successfully.',
            username: username,
            success: true,
        };
    }

    @Post('logout')
    async logoutUser(@Res({ passthrough: true }) res: express.Response) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return {
            message: 'User logged out successfully.',
            success: true,
        };
    }
}

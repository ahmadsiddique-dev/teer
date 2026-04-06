import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import * as express from 'express';
import { ILogin, IRegister } from './types/auth.type';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async regiserUser(
        @Body() registerUserDto: RegisterUserDto,
        @Res({ passthrough: true }) res: express.Response,
    ): Promise<IRegister> {
        let { accessToken, refreshToken, username } =
            await this.authService.registerUser(registerUserDto);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

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
    ): Promise<ILogin> {
        const { accessToken, refreshToken, username } =
            await this.authService.signInUser(registerUserDto);

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
    async logoutUser(
        @Res({ passthrough: true }) res: express.Response,
    ): Promise<{ message: string; success: boolean }> {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return {
            message: 'User logged out successfully.',
            success: true,
        };
    }

    @Post('check-unique')
    async checkUniqueUsername(@Body() {username}: { username: string}): Promise<boolean> {
        console.log("BROOM: ", username)
        return this.authService.uniqueUsername({username})
    }
}

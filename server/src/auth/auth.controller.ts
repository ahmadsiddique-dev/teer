import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post() 
    regiserUser (@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto)
    }
}

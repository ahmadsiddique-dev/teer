import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User, UserDocument } from './schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor (@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async registerUser (data: RegisterUserDto) {
        console.log('data :>> ', data.paraphrase, data.password, data.username);
        const newUser = await this.userModel.create({
            paraphrase: data.paraphrase,
            username: data.username,
            password: data.password
        })
        return {
            message: "User created successfully.",
            newUser: newUser
        }
    }

    signInUser (data: RegisterUserDto) {
        
    }
}

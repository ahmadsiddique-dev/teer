import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../auth/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
    ) {}

    async getUser() {
        console.log('In service...');
        const users = await this.UserModel.find({}, { username: 1 });
        if (users.length === 0) {
            return {
                success: true,
                message: 'No users available',
            };
        }

        return {
            success: true,
            message: 'Users fetched successfully',
            users: users,
        };
    }

    async searchUser(payload: string) {
        console.log("payload: ", payload) 
        const users = await this.UserModel.find({
            username: { $regex: payload, $options: 'i' },
        }, {username: 1, _id: 1});

        if (users.length === 0) {
            return {
                success: true,
                message: 'No users available',
            };
        }

        return {
            success: true,
            message: 'Users fetched successfully',
            users: users,
        };
    }
}

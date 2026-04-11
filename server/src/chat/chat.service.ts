import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../auth/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
    Conversation,
    ConversationDocument,
    ConversationSchema,
} from './schemas/Conversation.schema';
import { Message, MessageDocument } from './schemas/Message.schema';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        @InjectModel(Conversation.name)
        private ConversationModel: Model<ConversationDocument>,
        @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
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
        console.log('payload: ', payload);
        const users = await this.UserModel.find(
            {
                username: { $regex: payload, $options: 'i' },
            },
            { username: 1, _id: 1 },
        );

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

    async sendMessage(payload: {
        message: string;
        userId: string;
        receiverId: string;
    }) {
        const userObjectId = new Types.ObjectId(payload.userId);
        const receiverObjectId = new Types.ObjectId(payload.receiverId);

        let conversation = await this.ConversationModel.findOne({
            participants: { $all: [userObjectId, receiverObjectId] },
        });

        if (!conversation) {
            conversation = await this.ConversationModel.create({
                participants: [userObjectId, receiverObjectId],
            });
        }

        console.log('COnversation: ', conversation);

        const newMessage = await this.MessageModel.create({
            conversation_id: conversation._id,
            sender: userObjectId,
            content: payload.message,
        });

        return newMessage;
    }

    async getChat(payload: any) {
        const cdata = await this.ConversationModel.findOne({
            participants: { $all: [payload.senderId, payload.receiverId] },
        });

        const messages = await this.MessageModel.find({
            conversation_id: cdata?._id,
        });
        console.log('payload: ', payload);
        console.log('CData: ', messages);
        return messages;
    }
}

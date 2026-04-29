import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../auth/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
    Conversation,
    ConversationDocument,
} from './schemas/Conversation.schema';
import { Message, MessageDocument } from './schemas/Message.schema';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        @InjectModel(Conversation.name)
        private ConversationModel: Model<ConversationDocument>,
        @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
    ) {}

    async getUser() {
        const users = await this.UserModel.find(
            {},
            { username: 1, profileImage: 1 },
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

    async searchUser(payload: string) {
        const users = await this.UserModel.find(
            {
                username: { $regex: payload, $options: 'i' },
            },
            { username: 1, _id: 1, profileImage: 1 },
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

        const newMessage = await this.MessageModel.create({
            conversation_id: conversation._id,
            sender: userObjectId,
            content: payload.message,
        });

        return newMessage;
    }

    async getChat(payload: any) {
        if (
            !payload.senderId ||
            !payload.receiverId ||
            payload.senderId === 'undefined' ||
            payload.receiverId === 'undefined'
        ) {
            return [];
        }
        const senderObjectId = new Types.ObjectId(payload.senderId);
        const receiverObjectId = new Types.ObjectId(payload.receiverId);
        const cdata = await this.ConversationModel.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] },
        });

        const messages = await this.MessageModel.find({
            conversation_id: cdata?._id,
        });
        return messages;
    }

    async getSidebarChat(id: string) {
        if (!id || id === 'undefined') {
            return [];
        }
        const objectId = new Types.ObjectId(id);
        const conversations = await this.ConversationModel.find({
            participants: { $all: [objectId] },
        })
            .populate('participants', '_id username profileImage')
            .lean();

        const data = conversations
            .map((e) => {
                return e.participants.find((p: any) => p._id.toString() !== id);
            })
            .filter(Boolean);

        return data;
    }

    @Cron('0 */1 * * * *')
    async handleProfiles() {
        const now = new Date();
        const expiredUsers = await this.UserModel.find({
            deleteTime: { $lt: now },
        }).select('_id');
        const userIds = expiredUsers.map((user) => user._id);

        if (userIds.length === 0)
            return { message: 'No users to delete, fam.' };

        await Promise.all([
            this.UserModel.deleteMany({ _id: { $in: userIds } }),
            this.ConversationModel.deleteMany({ participants: { $in: userIds } }),
            this.MessageModel.deleteMany({ sender: { $in: userIds } }),
        ]);

        return { deletedCount: userIds.length };
    }
}

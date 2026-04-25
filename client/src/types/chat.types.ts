import type { IUser } from './user.types';

export interface IConversation {
    _id: string;
    participants: (string | IUser)[];
    createdAt: string;
}

export interface IMessage {
    _id: string;
    conversation_id: string;
    sender: string | IUser;
    content: string;
    created_at: string;
}

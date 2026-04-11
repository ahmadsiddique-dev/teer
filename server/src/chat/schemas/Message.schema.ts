import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    })
    conversation_id!: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    sender!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    content!: string;

    @Prop({ default: Date.now })
    created_at!: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

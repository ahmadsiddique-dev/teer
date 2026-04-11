import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema()
export class Conversation {
    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: true,
    })
    participants!: mongoose.Types.ObjectId[];

    @Prop({ default: Date.now })
    createdAt!: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../auth/schemas/auth.schema';
import { ChatGateway } from './chat.gateway';
import { Conversation, ConversationSchema } from './schemas/Conversation.schema';
import { Message, MessageSchema } from './schemas/Message.schema';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: userSchema},
      {name: Conversation.name, schema: ConversationSchema},
      {name: Message.name, schema: MessageSchema}
    ])
  ]
})
export class ChatModule {}

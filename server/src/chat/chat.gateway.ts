import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
    namespace: 'chat',
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    constructor(private chatService: ChatService) {}

    @WebSocketServer()
    server!: Server;

    @SubscribeMessage('register')
    handleRegister(
        @ConnectedSocket() client: Socket,
        @MessageBody() userId: string,
    ) {
        client.join(userId);
    }

    @SubscribeMessage('message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: { message: string; userId: string; receiverId: string },
    ) {
        const message = await this.chatService.sendMessage(payload);
        this.server.to(payload.userId).to(payload.receiverId).emit('message', message);
    }
}

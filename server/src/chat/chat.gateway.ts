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
        origin: 'http://localhost:5173',
        credentials: true,
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
        console.log(`[Socket] Client ${client.id} joining room ${userId}`);
        client.join(userId);
    }

    @SubscribeMessage('message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: { message: string; userId: string; receiverId: string },
    ) {
        console.log(`[Socket] Received message from ${payload.userId} to ${payload.receiverId}: ${payload.message}`);
        const message = await this.chatService.sendMessage(payload);
        console.log(`[Socket] Emitting message to ${payload.userId} and ${payload.receiverId}`);
        this.server.to(payload.userId).to(payload.receiverId).emit('message', message);
    }
}

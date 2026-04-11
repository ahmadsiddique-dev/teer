import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
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

    @SubscribeMessage('message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: any,
    ) {
        console.log("payload: ", payload)
        // const message = await this.chatService.sendMessage(payload);
        // this.server.emit('message', message)
    }
}

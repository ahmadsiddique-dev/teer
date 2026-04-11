import {
    Ack,
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
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
    constructor(private chatService: ChatService) {

    }

    @SubscribeMessage('message')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
        this.chatService.sendMessage(payload)
    }

    @SubscribeMessage('father')
    handleFather(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
      console.log('fatherdo: ', client)
    }
}

// import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway({namespace: "chat", cors: {
//   origin: "*"
// }})
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
//   @WebSocketServer()
//   server!: Server;

//   handleConnection(client: Socket) {
//     console.log("user connected", client.id)
//   }

//   handleDisconnect(client: Socket) {
//     console.log("user disconnected: ", client.id)
//   }
// }

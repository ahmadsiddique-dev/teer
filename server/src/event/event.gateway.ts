import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: "event"})
export class EventGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log("payload: ", payload)
    return 'This is a message re return';
  }
}

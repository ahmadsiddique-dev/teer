import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: "event"})
export class EventGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log("payload: ", payload)
    return 'This is a message re return';
  }
}

import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private ChatService: ChatService) {}

    @Get('get-users')
    getUsers() {
        console.log("in controller")
        return this.ChatService.getUser();
    }
}

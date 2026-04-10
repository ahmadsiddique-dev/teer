import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private ChatService: ChatService) {}

    @Get('get-users')
    getUsers() {
        return this.ChatService.getUser();
    }

    @Get('search-user')
    searchUsers(@Query('user') user: string) {
        return this.ChatService.searchUser(user)
    }
}

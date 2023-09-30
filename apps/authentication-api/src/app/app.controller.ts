import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserDocument } from '../users/models/user.schema';
import { Response } from 'express';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(
        @CurrentUser() currentUser: UserDocument,
        @Res({ passthrough: true }) response: Response
    ) {
        await this.appService.login(currentUser, response);
        response.send(currentUser);
    }

    @Get()
    getData() {
        return this.appService.getData();
    }
}

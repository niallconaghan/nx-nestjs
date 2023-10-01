import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';

import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CurrentUser, UserDocument } from '@nx-nestjs/common';

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

    @UseGuards(JwtAuthenticationGuard)
    @MessagePattern('authenticate')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async authenticate(@Payload() data: any) {
        return data.user;
    }

    @Get()
    getData() {
        return this.appService.getData();
    }
}

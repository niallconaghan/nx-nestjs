import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CurrentUser, UserDocument } from '@nx-nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthenticationGuard)
    async getUser(@CurrentUser() currentUser: UserDocument) {
        return currentUser;
    }
}

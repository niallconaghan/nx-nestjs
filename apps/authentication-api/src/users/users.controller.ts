import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { UserDocument } from './models/user.schema';
import { JwtAuthenticationGuard } from '../app/guards/jwt-authentication.guard';

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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bycrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        return this.usersRepository.create({
            ...createUserDto,
            password: await bycrypt.hash(createUserDto.password, 10),
        });
    }

    async verify(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });

        const valid = await bycrypt.compare(password, user.password);

        if (!valid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}

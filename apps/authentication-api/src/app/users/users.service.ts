import {
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bycrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto);
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

    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto);
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email });
        } catch (error) {
            return;
        }
        throw new UnprocessableEntityException('Email already exists');
    }
}

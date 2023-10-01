import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { LoggerModule } from '@nx-nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
@Module({
    imports: [
        UsersModule,
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.string().required(),
                HTTP_PORT: Joi.number().required(),
                TCP_PORT: Joi.number().required(),
            }),
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}

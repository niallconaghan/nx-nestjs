/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: configService.get('TCP_PORT'),
        },
    });

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    app.useLogger(app.get(Logger));

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    await app.startAllMicroservices();

    await app.listen(configService.get('HTTP_PORT'));
}

bootstrap();

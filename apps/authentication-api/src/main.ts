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

async function bootstrap() {
    console.log('Test auth api');

    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    app.useLogger(app.get(Logger));

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const configService = app.get(ConfigService);

    await app.listen(configService.get('PORT'));
}

bootstrap();

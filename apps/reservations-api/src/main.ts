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
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    app.useLogger(app.get(Logger));

    app.use(cookieParser());

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const configService = app.get(ConfigService);

    await app.listen(configService.get('PORT'));
}

bootstrap();

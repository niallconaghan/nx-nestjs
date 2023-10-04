import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import {
    DatabaseModule,
    LoggerModule,
    PAYMENTS_SERVICE,
} from '@nx-nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import {
    ReservationDocument,
    ReservationSchema,
} from './models/reservation.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_SERVICE } from '@nx-nestjs/common';

@Module({
    imports: [
        LoggerModule,
        DatabaseModule,
        DatabaseModule.forFeature([
            { name: ReservationDocument.name, schema: ReservationSchema },
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required(),
                AUTHENTICATION_HOST: Joi.string().required(),
                AUTHENTICATION_PORT: Joi.number().required(),
                PAYMENTS_HOST: Joi.string().required(),
                PAYMENTS_PORT: Joi.number().required(),
            }),
        }),
        ClientsModule.registerAsync([
            {
                name: AUTHENTICATION_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('AUTHENTICATION_HOST'),
                        port: configService.get('AUTHENTICATION_PORT'),
                    },
                }),
                inject: [ConfigService],
            },
            {
                name: PAYMENTS_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('PAYMENTS_HOST'),
                        port: configService.get('PAYMENTS_PORT'),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}

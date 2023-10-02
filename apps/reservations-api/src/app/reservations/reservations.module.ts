import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@nx-nestjs/common';
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
        DatabaseModule,
        DatabaseModule.forFeature([
            { name: ReservationDocument.name, schema: ReservationSchema },
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required(),
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
        ]),
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}

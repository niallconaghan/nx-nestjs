import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from '../reservations/reservations.module';
import { LoggerModule } from '@nx-nestjs/common';

@Module({
    imports: [ReservationsModule, LoggerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

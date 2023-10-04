import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@nx-nestjs/common';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern('create_charge')
    @UsePipes(new ValidationPipe())
    async createCharge(@Payload() data: CreateChargeDto) {
        return this.appService.createCharge(data);
    }
}

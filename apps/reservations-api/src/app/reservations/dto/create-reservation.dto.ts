import { Type } from 'class-transformer';
import {
    IsDate,
    IsDefined,
    IsNotEmptyObject,
    ValidateNested,
} from 'class-validator';
import { CreateChargeDto } from '@nx-nestjs/common';

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto;
}

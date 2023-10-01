import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
    CurrentUser,
    JwtAuthenticationRouteGuard,
    UserDto,
} from '@nx-nestjs/common';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Post()
    @UseGuards(JwtAuthenticationRouteGuard)
    async create(
        @Body() createReservationDto: CreateReservationDto,
        @CurrentUser() user: UserDto
    ) {
        return this.reservationsService.create(createReservationDto, user._id);
    }

    @Get()
    @UseGuards(JwtAuthenticationRouteGuard)
    async findAll() {
        return this.reservationsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthenticationRouteGuard)
    async findOne(@Param('id') id: string) {
        return this.reservationsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthenticationRouteGuard)
    async update(
        @Param('id') id: string,
        @Body() updateReservationDto: UpdateReservationDto
    ) {
        return this.reservationsService.update(id, updateReservationDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthenticationRouteGuard)
    async remove(@Param('id') id: string) {
        return this.reservationsService.remove(id);
    }
}

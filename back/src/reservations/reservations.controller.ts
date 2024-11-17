import { Body, Controller, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from 'src/dtos/reservation.dto';
import { JwtStrategy } from 'src/guards/jwt.guard';
import { UserData } from 'src/user/user.decorator';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService
    ){}

    @Post('booking')
    @UseGuards(JwtStrategy)
    @HttpCode(201)
    async createReservation(
        @Body()newReservation: CreateReservationDto,
        @UserData('uuid') userUuid: string
    ){
        return await this.reservationsService.createReservation(newReservation, userUuid)
    }
}
import { Body, Controller, HttpCode, ParseUUIDPipe, Post, Get, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from 'src/dtos/reservation.dto';
import { GetUser } from 'src/decorators/user.decorator';
import { ReservationsService } from './reservations.service';
import { Authguard } from 'src/guards/auth.guard';
import { JwtStrategy } from 'src/guards/jwt.guard';

@Controller('reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService,
    ){}

    @Post('booking')

    @HttpCode(201)
    async createReservation(
        @Body()newReservation: CreateReservationDto,
        @GetUser('uuid') userUuid: string,
    ){
        return this.reservationsService.createReservation(newReservation,userUuid)
    }

    @Get('userReservations')
    @UseGuards(Authguard)
    @HttpCode(200)
    async getUserReservations(
        @GetUser('uuid') userUuid: string
    ){
        return await this.reservationsService.getUserReservations(userUuid)
    }

}

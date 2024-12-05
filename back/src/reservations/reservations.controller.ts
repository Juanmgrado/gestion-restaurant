import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from 'src/dtos/reservation.dto';
import { GetUser } from 'src/decorators/user.decorator';
import { ReservationsService } from './reservations.service';
import { Authguard } from 'src/guards/auth.guard';
import { JwtStrategy } from 'src/guards/jwt.guard';
import { ReturnedReservation } from 'src/dtos/returnedReservationType';

@Controller('reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService,
    ){}

    @Post('booking')
    @UseGuards(Authguard)
    @HttpCode(201)
    async createReservation(
        @Body()newReservation: CreateReservationDto,
        @GetUser('uuid') userUuid: string,
    ){
        return this.reservationsService.createReservation(newReservation,userUuid)
    }

    @Get('reservation/:userUuid')
    @UseGuards(Authguard)
    async getUserReservations(
      @Param('userUuid') userUuid: string,
    ): Promise<ReturnedReservation[] | null> {
      return this.reservationsService.getUserReservations(userUuid);
    }

    @Delete('cancel/:reservationId')
    @HttpCode(HttpStatus.OK)
    async cancelReservation(
      @Param('reservationId') reservationId: string,
    ): Promise<{ message: string }> {
      const message = await this.reservationsService.cancelReservation(reservationId);
      return { message };
    }
}

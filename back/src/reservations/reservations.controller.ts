import { Body, Controller, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from 'src/dtos/reservation.dto';
import { GetUser } from 'src/decorators/user.decorator';
import { ReservationsService } from './reservations.service';
import { Authguard } from 'src/guards/auth.guard';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { ReturnedReservation } from 'src/dtos/ReturnedReservation.dto';

@Controller('reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService,
        private readonly nodemailer: NodemailerService
    ){}

    @Post('booking')
    @UseGuards(Authguard)
    @HttpCode(201)
    async createReservation(
        @Body()newReservation: CreateReservationDto,
        @GetUser('uuid') userUuid: string,
        @GetUser('email') userEmail: string
    ){
        const returnedReservation: ReturnedReservation = await this.reservationsService.createReservation(newReservation, userUuid)
        await this.nodemailer.reservationMail(userEmail, returnedReservation)

        return returnedReservation;
    }
}

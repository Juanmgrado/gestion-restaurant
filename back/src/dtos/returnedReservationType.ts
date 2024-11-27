import { IStatus } from "../entities/reservation.entity";

export class ReturnedReservation {
    reservIdentification: string;
    day: Date;
    startTime: Date;
    guest: number;
    reservationWorth: number;
    tableNumber: number;
    status: IStatus;
}
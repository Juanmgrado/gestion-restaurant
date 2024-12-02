import { IStatus } from "../entities/reservation.entity";

export class ReturnedReservation {
    reservIdentification: string;
    day: string;
    startTime: string;
    guest: number;
    reservationWorth: number;
    tableNumber: number;
    status: IStatus;
}
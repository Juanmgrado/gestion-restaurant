import { IStatus } from "src/entities/reservation.entity";

export class ReturnedReservation {
    reservIdentification: string;
    day: Date;
    startTime: Date;
    guest: number;
    tableNumber: number;
    user: string;
    status: IStatus;
}
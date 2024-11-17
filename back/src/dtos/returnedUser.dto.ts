import { IRol } from "src/entities/user.entity";

export class ReturnedUser{
    uuid: string;
    username: string;
    email: string;
    rol: IRol
}
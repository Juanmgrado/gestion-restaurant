import { IRol } from "src/entities/user.entity";

export class ReturnedUser{
    uuid: string;
    username: string;
    fullname:string
    email: string;
    rol: IRol
}
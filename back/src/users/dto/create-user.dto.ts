import { Role } from "src/auth/dto/register.dto";

export class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role: Role
}

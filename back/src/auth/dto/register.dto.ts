import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export enum Role {
    Mesero = 'mesero',
    Cocinero = 'cocinero',
    Admin = 'admin',
    Cliente = 'cliente',
}

export class RegisterDto {
 
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string

    @IsEnum(Role)
    role: Role;
}
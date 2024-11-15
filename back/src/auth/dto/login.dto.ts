import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario para el inicio de sesión.',
        example: 'usuario@correo.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario.',
        example: 'password123',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}

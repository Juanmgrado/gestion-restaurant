import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { IRole } from "src/entities/user.entity";

// export enum Role {
//     Mesero = 'mesero',
//     Cocinero = 'cocinero',
//     Admin = 'admin',
//     Cliente = 'cliente',
// }

export class RegisterDto {
    @ApiProperty({
        description: 'Nombre completo del usuario.',
        example: 'Ernesto Vivas',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        description: 'Nombre de usuario único para el acceso.',
        example: 'ernestico',
    })
    @IsString()
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    username: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario.',
        example: 'ernestin@correo.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario.',
        example: 'password123',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @ApiProperty({
        description: 'Rol del usuario en el sistema.',
        enum: IRole,
        example: IRole.admin,
    })
    @IsEnum(IRole)
    role: IRole;
}

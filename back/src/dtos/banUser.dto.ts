import { IsString, IsEmail, IsUUID, ValidateIf, IsNotEmpty } from 'class-validator';

export class BanUserDto {
    @ValidateIf((o) => !o.email && !o.uuid)
    @IsString()
    @IsNotEmpty({ message: 'El username no puede estar vacío' })
    username?: string;

    @ValidateIf((o) => !o.username && !o.uuid)
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email?: string;

    @ValidateIf((o) => !o.username && !o.email)
    @IsUUID('4', { message: 'El uuid debe ser válido' })
    @IsNotEmpty({ message: 'El uuid es requerido' })
    uuid?: string;
}

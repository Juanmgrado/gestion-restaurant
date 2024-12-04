import { IsString, IsEmail, IsUUID, ValidateIf, IsNotEmpty, IsEnum } from 'class-validator';
import { IRol } from 'src/entities/user.entity';


    export class FindUserDto {
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
    
        @IsEnum(IRol, { message: 'El rol debe ser uno de los valores válidos: user, camarero, cheff' })
        newRole?: IRol;  // Asegúrate de validar que el rol sea un valor válido de IRol
    }
    


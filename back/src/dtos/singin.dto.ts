import { IsNotEmpty, IsOptional, IsString, IsEmail, IsStrongPassword, ValidateIf } from "class-validator";

export class LoginDto {
  
    @ValidateIf(o => !o.email)  
    @IsString()
    @IsOptional()
    readonly username?: string;

    @ValidateIf(o => !o.username) 
    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1, 
    })
    @IsNotEmpty()
    readonly password: string;
}

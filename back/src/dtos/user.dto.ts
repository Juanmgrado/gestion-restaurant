import { IsString, IsNotEmpty, IsEnum, Matches, IsEmail, Length, IsStrongPassword } from 'class-validator';
import { IRol } from 'src/entities/user.entity';


export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(3, 40) 
  readonly fullname: string;
  

  @IsNotEmpty()
  @IsString()
  @Length(3,15)
  @Matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
  readonly username: string;
  
  @IsEmail()
  @IsNotEmpty()
  @Length(10,40)
  readonly email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1, 
  })
  @IsNotEmpty()
  readonly password: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1, 
  })
  @IsNotEmpty()
  readonly repeatpassword: string;
}

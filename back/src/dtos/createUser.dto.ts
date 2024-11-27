import { IsString, IsNotEmpty, IsEnum, Matches, IsEmail, Length, IsStrongPassword, Validate } from 'class-validator';
import { MatchPassword } from 'src/decorators/passwordsMatch.decorator';
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

 
 
  readonly password: string;


 
  
  readonly repeatpassword: string;
}

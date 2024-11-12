import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum UserRole {
  MESERO = 'mesero',
  COCINERO = 'cocinero',
  ADMIN = 'admin',
  CLIENTE = 'cliente',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  readonly rol: UserRole;
}

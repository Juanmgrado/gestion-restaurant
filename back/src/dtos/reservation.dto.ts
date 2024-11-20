import { IsString, IsDateString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  readonly date: string;

  @IsString()
  @IsNotEmpty()
  readonly time: string;

  @IsNumber()
  @IsNotEmpty()
  readonly guests: number;
}

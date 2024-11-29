import { IsDate, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer'; 
import { IsTimeInRange } from '../decorators/timeMatch.decorator';import { IsDateNotPassed } from '../decorators/dayCheck.decorator';
  
export class CreateReservationDto {
  
  @IsDate()
  @IsNotEmpty({ message: 'Introduzca el día de la reserva' })
  @Transform(({ value }) => new Date(value))  
  @IsDateNotPassed({ message: 'La fecha de la reserva no puede ser menor al día de hoy' }) 
  readonly day: string;

  @IsDate()
  @IsNotEmpty({ message: 'La fecha de reserva es obligatoria' })
  @Transform(({ value }) => new Date(value))  
  @IsTimeInRange({ message: 'La hora de la reserva debe ser entre las 13:00 y las 23:00' }) 
  readonly startTime: string;

 
 
  readonly tableNumber?: number;
  
  @IsNumber()
  @IsNotEmpty({ message: 'Introduzca la cantidad de comensales' })
  @Min(1, { message: 'La cantidad de comensales no puede ser 0' })
  @Max(100, { message: 'La cantidad máxima de comensales es de 100 personas, para una cifra mayor deberá comunicarse al restaurante telefónicamente' })
  readonly guests: number;

}

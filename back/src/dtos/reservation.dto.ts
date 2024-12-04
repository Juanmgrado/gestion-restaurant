import { IsDate, IsNotEmpty, IsNumber, Min, Max, IsString } from 'class-validator';
import { Transform } from 'class-transformer'; 
import { IsTimeInRange } from '../decorators/timeMatch.decorator';import { IsDateNotPassed } from '../decorators/dayCheck.decorator';
  
export class CreateReservationDto {
  
  @IsString()
  @IsNotEmpty({ message: 'Introduzca el día de la reserva' })
   readonly day: string;

  @IsString()
  @IsNotEmpty({ message: 'La hora de la reserva es obligatoria' }) 
  readonly day: string;
  
  @IsNotEmpty({ message: 'La fecha de reserva es obligatoria' })
  readonly startTime: string;

 
 
  readonly tableNumber?: number;
  
  @IsNumber()
  @IsNotEmpty({ message: 'Introduzca la cantidad de comensales' })
  @Min(1, { message: 'La cantidad de comensales no puede ser 0' })
  @Max(100, { message: 'La cantidad máxima de comensales es de 100 personas, para una cifra mayor deberá comunicarse al restaurante telefónicamente' })
  readonly guests: number;

}

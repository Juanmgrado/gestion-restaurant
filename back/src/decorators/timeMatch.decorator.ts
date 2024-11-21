import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsTimeInRange(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isTimeInRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value instanceof Date) {
            const hours = value.getUTCHours(); 
            return hours >= 13 && hours <= 23;  
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return 'La hora de la reserva debe ser entre las 13:00 y las 23:00';
        },
      },
    });
  };
}
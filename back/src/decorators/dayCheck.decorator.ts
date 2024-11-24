// import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// export function IsDateNotPassed(validationOptions?: ValidationOptions) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       name: 'isDateInFuture',
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           if (value instanceof Date) {
//             const now = new Date();
//             now.setHours(0, 0, 0, 0);  
//             return value >= now;  
//           }
//           return false;
//         },
//         defaultMessage(args: ValidationArguments) {
//           return 'La fecha de la reserva no puede ser menor al día de hoy';
//         },
//       },
//     });
//   };
// }

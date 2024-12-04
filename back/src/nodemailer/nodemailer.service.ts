import { ConflictException, Injectable } from '@nestjs/common';
import { transporter } from 'src/config/nodemailer.config';
import { ReturnedReservation } from '../dtos/returnedReservationType';

@Injectable()
export class NodemailerService {
    
    async registerMain(email: string): Promise<void> {
       
        try{
            const info = await transporter.sendMail({
            from: process.env.GMAIL_USER , 
            to: email, 
            subject: "Bienvenido! ✔", 
            html: `
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                color: #333;
                                background-color: #f4f4f4;
                                padding: 20px;
                            }
                            .container {
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            }
                            h2 {
                                color: #4CAF50;
                            }
                            p {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .footer {
                                margin-top: 30px;
                                font-size: 14px;
                                text-align: center;
                                color: #777;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>¡Gracias por registrarte en nuestra app!</h2>
                            <p>Esperamos que disfrutes de nuestro acogedor restaurante y de nuestros exquisitos platos, hechos especialmente para ti. Nos encantaría que vivas una experiencia única con nosotros. ¡Te esperamos pronto!</p>
                            <div class="footer">
                                <p>© ${new Date().getFullYear()} Restaurante Gourmet. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </body>
            `
            });
      
            console.log("Message sent: %s", info.messageId);
        
        }catch(error){
            console.log(error);
            throw new ConflictException('Error al enviar email')
        }
    }

    async reservationMail(email: string, returnedReservation: ReturnedReservation): Promise<void> {
       
        try{
            const info = await transporter.sendMail({
            from: process.env.GMAIL_USER , 
            to: email, 
            subject: "Reserva ✔", 
            html: `
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .container {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                            color: #4CAF50;
                        }
                        .reservation-details {
                            margin-top: 20px;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .reservation-details strong {
                            font-weight: bold;
                        }
                        .footer {
                            margin-top: 30px;
                            font-size: 14px;
                            text-align: center;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Detalle de su Reserva</h2>
                        <p>Este es el detalle de su reserva. Recuerde finalizar el pago para confirmarla, caso contrario, la misma será cancelada luego de un plazo de 3 horas.</p>
                        <div class="reservation-details">
                            <p><strong>Día:</strong> ${returnedReservation.day}</p>
                            <p><strong>ID de Reserva:</strong> ${returnedReservation.reservIdentification}</p>
                            <p><strong>Hora:</strong> ${returnedReservation.startTime}</p>
                            <p><strong>Mesa:</strong> ${returnedReservation.tableNumber}</p>
                            <p><strong>Comensales:</strong> ${returnedReservation.guest}</p>
                            <p><strong>Estado Actual:</strong> ${returnedReservation.status}</p>
                        </div>
                        <div class="footer">
                        <p>© ${new Date().getFullYear()} Restaurante Gourmet. Todos los derechos reservados.</p>
                    </div>
                    </div>
                </body>
        `});
      
            console.log("Message sent: %s", info.messageId);
        
        }catch(error){
            console.log(error)
            throw new ConflictException('Error al enviar email');
        }
    }

    async reservActiveMail(email: string, paymentId: string): Promise<void>{
         
        try{
            const info = await transporter.sendMail({
            from: process.env.GMAIL_USER , 
            to: email, 
            subject: "Reserva confirmada ✔", 
            html:  `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmación de Pago</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; }
                    .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden; }
                    .header { background-color: #4caf50; color: #ffffff; text-align: center; padding: 20px; }
                    .header h1 { margin: 0; }
                    .content { padding: 20px; color: #333333; }
                    .content p { margin: 10px 0; line-height: 1.6; }
                    .highlight { font-weight: bold; color: #4caf50; }
                    .footer { text-align: center; background-color: #f1f1f1; padding: 10px; font-size: 12px; color: #888888; }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1>¡Pago exitoso!</h1>
                    </div>
                    <div class="content">
                        <p>Hola,</p>
                        <p>Nos complace informarte que el pago de tu reserva ha sido <span class="highlight">procesado con éxito</span>.</p>
                        <p>Por favor, presenta el siguiente código en nuestro restaurante para utilizarlo como bono de pago:</p>
                        <p class="highlight" style="font-size: 1.5em; text-align: center;">${paymentId}</p>
                        <p>El bono será válido para aplicar al consumo que realices en el restaurante.</p>
                        <p>Gracias por elegirnos, ¡esperamos verte pronto!</p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Restaurante Gourmet. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>`
            })
            console.log("Message sent: %s", info.messageId);

        }catch(error){
            throw new ConflictException('Error al enviar email')
            
        }
    }

    async paymentReservFailMail(email: string, resevationUuid: string): Promise <void>{

        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER , 
            to: email, 
            subject: "Pago de reserva rechazado X", 
            html:
                `<head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error en el Pago</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background-color: #d9534f;
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                }
                .header h1 {
                    margin: 0;
                }
                .content {
                    padding: 20px;
                    color: #333333;
                }
                .content p {
                    margin: 10px 0;
                    line-height: 1.6;
                }
                .highlight {
                    font-weight: bold;
                    color: #d9534f;
                }
                .footer {
                    text-align: center;
                    background-color: #f1f1f1;
                    padding: 10px;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Error en el Pago</h1>
                </div>
                <div class="content">
                    <p>Hola,</p>
                    <p>Lamentamos informarte que el pago de tu reserva <span class="highlight">#{${resevationUuid}}</span> no se pudo realizar con éxito.</p>
                    <p>Por favor, vuelve a intentarlo para asegurar tu reserva.</p>
                    <p>Recuerda que, si no se completa el pago dentro de las próximas <span class="highlight">3 horas</span>, la reserva será dada de baja automáticamente.</p>
                    <p>Si necesitas ayuda, no dudes en ponerte en contacto con nosotros.</p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Restaurante Gourmet. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>`
        })
        console.log("Message sent: %s", info.messageId);
    
    }catch(error){
        console.log(error)
        throw new ConflictException(`Error a enviar email ${error}`)
    }
    
}

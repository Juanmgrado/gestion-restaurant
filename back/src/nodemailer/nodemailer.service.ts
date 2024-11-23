import { Injectable } from '@nestjs/common';
import { transporter } from 'src/config/nodemailer.config';
import { ReturnedReservation } from '../dtos/returnedReservationType';

@Injectable()
export class NodemailerService {
    
    async registerMain(email: string) {
       
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
                                <p>El equipo de [Nombre de tu restaurante]</p>
                            </div>
                        </div>
                    </body>
            `
            });
      
            console.log("Message sent: %s", info.messageId);
        
        }catch(error){
            console.log(error);
        }
    }

    async reservationMail(email: string, returnedReservation: ReturnedReservation) {
       
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
                            <p>Gracias por elegirnos, ¡esperamos verlo pronto!</p>
                        </div>
                    </div>
                </body>
        `});
      
            console.log("Message sent: %s", info.messageId);
        
        }catch(error){
            console.log(error);
        }
    }
}

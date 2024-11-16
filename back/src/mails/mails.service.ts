import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: RegisterDto) {
    const url = `https://app.soyhenry.com/`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Te damos la bienvenida a tu Restaurante Final Project',
      template: './welcome',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
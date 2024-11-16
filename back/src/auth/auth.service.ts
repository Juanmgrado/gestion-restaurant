import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailsService
    ) {}

    async login({email, password}: LoginDto) {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas')
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const  payload = {email: user.email };

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            email
        };
    }

    async register({name, email, password, role, username}: RegisterDto) {

        const user = await this.userService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('El usuario ya está registrado')
        }

        const generatedUsername = username || name.toLowerCase().replace(/\s+/g, '') + Math.random().toString(36).substring(2, 10);

        const newUser = await this.userService.create({ 
            name, 
            email, 
            password: await bcryptjs.hash(password, 10), 
            role,
            username: generatedUsername});

            try {
                await this.mailService.sendUserConfirmation(newUser);
              } catch (error) {
                console.error('Error enviando correo:', error);
              }
              console.log('Correo enviado');

              return newUser;
            
    }
}

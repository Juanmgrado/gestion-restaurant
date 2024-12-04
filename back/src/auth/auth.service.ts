import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

import { IRol } from 'src/entities/user.entity';
import { LoginDto } from 'src/dtos/singin.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';

export interface IPayload{
    uuid: string,
    username: string,
    email: string,
    rol: IRol
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly nodemailerService: NodemailerService
    ) {}

    async genereteToken(payload: IPayload){
        
        try{
            const accessToken =  await this.jwtService.signAsync(payload, {expiresIn: '5m'});
            const refreshToken =  await this.jwtService.signAsync(payload, {expiresIn: '7d'});

            return { accessToken, refreshToken }
        
        }catch(error){
            throw new InternalServerErrorException(`error al generar token ${error}`)
        }
    };

    async refreshToken(refreshToken: string){
        try{
            const payload: IPayload = await this.jwtService.verifyAsync(refreshToken)
            
            const newAccessToken = await this.jwtService.signAsync({
                uuid: payload.uuid,
                username: payload.username,
                email: payload.email,
                rol: payload.rol
            },{
                expiresIn: '5m'
            });
            
            return { newAccessToken, refreshToken}
        
        }catch(error){
            throw new InternalServerErrorException('error al verificar el accesso');
        }
    };

    async signin(loginUser: LoginDto) {
        const { username, email, password } = loginUser;
    
        // Busca al usuario según el email o el username
        const foundUser =
            email
                ? await this.userService.findUserByField('email', email)
                : await this.userService.findUserByField('username', username);
        
                    const chekedPassword = await bcryptjs.compare(password, foundUser.password);
                    if (!chekedPassword) throw new ConflictException('Credenciales inválidas');
                
                   if(!foundUser) throw new ConflictException('Credenciales inválidas');
                   if(foundUser.banned === true) throw new ConflictException('Acceso denegado, por favor comuniquese con el soporte')
                   if(foundUser.isActive === false) throw new ConflictException('Usuario inactivo, por favor comuniquese con el soporte')
                   
    
        const payload: IPayload = {
            uuid: foundUser.uuid,
            username: foundUser.username,
            email: foundUser.email,
            rol: foundUser.rol,
        };
    
        const { accessToken, refreshToken } = await this.genereteToken(payload);
    
        return {
            refreshToken,
            accessToken,
            user: {
                uuid: foundUser.uuid,
                username: foundUser.username,
                email: foundUser.email,
                fullname: foundUser.fullname,
                rol: foundUser.rol,
                isActive: foundUser.isActive, 
                banned: foundUser.banned,     
            },
        };
    }
    

    async signup(newUser: CreateUserDto) {
        try {
            
            const createdUser = await this.userService.createUser(newUser);
            if (!createdUser) throw new BadRequestException('Error al crear usuario');
    
            const payload: IPayload = {
                uuid: createdUser.uuid,
                username: createdUser.username,
                email: createdUser.email,
                rol: createdUser.rol,
            };
    
            const { accessToken, refreshToken } = await this.genereteToken(payload);
    
            await this.nodemailerService.registerMain(newUser.email);
    
            return {
                accessToken,
                refreshToken,
                user: {
                    uuid: createdUser.uuid,
                    username: createdUser.username,
                    email: createdUser.email,
                    rol: createdUser.rol,
                    isActive: createdUser.isActive,
                    banned: createdUser.banned,    
                },
            };
        } catch (error) {
            throw new InternalServerErrorException(`Ha ocurrido un error inesperado ${error.message}`);
        }
    }
    
    

}

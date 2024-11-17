import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/user.dto';
import { IRol } from 'src/entities/user.entity';
import { LoginDto } from 'src/dtos/singin.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

interface IPayload{
    uuid: string,
    username: string,
    email: string,
    rol: IRol
}

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async genereteToken(payload: IPayload){
        return  await this.jwtService.signAsync(payload)
    }

    async signin(loginUser: LoginDto) {
        
        const { username, email, password } = loginUser

        const foundUser =
        email
            ? await this.userService.findUserByField('email', email)
            : await this.userService.findUserByField('username', username);

            if (!foundUser) throw new ConflictException('Credenciales inválidas');
    
        const chekedPassword = await bcryptjs.compare(password, foundUser.password)
            if (!chekedPassword) throw new ConflictException('Credenciales inválidas')
                
        const payload = {
            uuid: foundUser.uuid,
            username: foundUser.username,
            email: foundUser.email,
            rol: foundUser.rol
        }
        
        const token = await this.genereteToken(payload);

        return { token };
    }
    

    async signup(newUser: CreateUserDto) {

        try{
            const createdUser = await this.userService.createUser(newUser)
                if (!createdUser) throw new BadRequestException('Error al crear usuario')

            const payload = {
                uuid: createdUser.uuid,
                username: createdUser.username,
                email: createdUser.email,
                rol: createdUser.rol
            }
        const token = await this.genereteToken(payload)

        return {token};
    
        }catch(error){
            throw new InternalServerErrorException(`Ha ocurrido un error inesperado ${error.message}`)
        }
    }

}

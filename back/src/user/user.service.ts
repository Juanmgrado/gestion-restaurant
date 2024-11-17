import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
import * as bcryptjs from 'bcryptjs'
import { Repository } from 'typeorm';
import { ReturnedUser } from 'src/dtos/returnedUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        readonly userRepository: Repository <User>
    ){}

    async createUser(newUser:CreateUserDto): Promise<ReturnedUser | null>{

        try {
            const { email, username } = newUser;

            const findUserEmail = await this.userRepository.findOneBy({email})
                if (findUserEmail) throw new ConflictException("El email ya esta en uso")
    
            const findUserUsername = await this.userRepository.findOneBy({username})
                if (findUserUsername) throw new ConflictException('Current username is in use')
                
            const createdUser = new User();
            Object.assign(createdUser, newUser)

            createdUser.password = await bcryptjs.hash(createdUser.password, 10);
            
            await this.userRepository.save(createdUser);

            return { 
                uuid: createdUser.uuid,
                username: createdUser.username,
                email: createdUser.email,
                rol: createdUser.rol
            }

        }catch(error){
            throw new InternalServerErrorException(`ha ocurrido un error ${error.message}`)
        }
    }

    async findUserByField(field: keyof User, value: string): Promise<User | null> {
        
        try {
            const foundUser = await this.userRepository.findOne({ where: { [field]: value } });
                if (!foundUser) throw new ConflictException("Credenciales inválidas");
            
            return foundUser;
        
        } catch (error) {
            throw new InternalServerErrorException(`Error en el servidor ${error.message}`);
        }
    }
} 

import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ReturnedUser } from 'src/dtos/returnedUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        readonly userRepository: Repository <User>
    ){}

    async createUser(newUser:CreateUserDto): Promise<ReturnedUser | null>{

        try{

            const { email, username } = newUser;

            const findUserEmail = await this.userRepository.findOneBy({email})
                if (findUserEmail) throw new ConflictException('Current email is in use')
    
            const findUserUsername = await this.userRepository.findOneBy({username})
                if (findUserUsername) throw new ConflictException('Current username is in use')
                
            const createdUser = new User();
            Object.assign(createdUser, newUser)

            await this.userRepository.save(createdUser);
            return { 
                username: createdUser.username,
                email: createdUser.email
            }
        
        }catch(error){
            throw new InternalServerErrorException(`internal server error ${error}`)
        }
    
    }
}

import { Body, Controller, Get, HttpCode, NotFoundException, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ReturnedUser } from 'src/dtos/returnedUser.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get()
    @HttpCode(200)
    async getAllUsers(){
        return this.userService.getAllUsers()
    }
    
    @Get('find')
    @HttpCode(200)
    async findUser(@Query('id') id: string): Promise<ReturnedUser | null> {
        if (!id) throw new NotFoundException('El ID del usuario es obligatorio.');
        
        const user = await this.userService.findUserById(id);
        if (!user) throw new NotFoundException('Usuario no encontrado.');
        
        return user;
    }
    
}

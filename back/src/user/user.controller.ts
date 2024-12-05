import { Body, Controller, Get, HttpCode, NotFoundException, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/guards/rol.guard';
import { Roles } from 'src/decorators/rol.decorator';
import { IRol, User } from 'src/entities/user.entity';
import { Authguard } from 'src/guards/auth.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { ReturnedUser } from 'src/dtos/returnedUser.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get()
    @UseGuards(RolesGuard)
    @Roles(IRol.manager)
    @HttpCode(200)
    async getAllUsers(): Promise <User[] |void>{
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
    

    @Put('deleteUser')
    @HttpCode(201)
    @UseGuards(Authguard)
    async deleteUser(
        @GetUser('uuid', ParseUUIDPipe) userUuid: string
    ): Promise <string | void>{
        return await this.userService.deleteUser(userUuid)
    }
}

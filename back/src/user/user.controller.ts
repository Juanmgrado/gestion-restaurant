import { Body, Controller, Get, HttpCode, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/guards/rol.guard';
import { Roles } from 'src/decorators/rol.decorator';
import { IRol, User } from 'src/entities/user.entity';
import { Authguard } from 'src/guards/auth.guard';
import { GetUser } from 'src/decorators/user.decorator';

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

    @Put('deleteUser')
    @HttpCode(201)
    @UseGuards(Authguard)
    async deleteUser(
        @GetUser('uuid', ParseUUIDPipe) userUuid: string
    ): Promise <string | void>{
        return await this.userService.deleteUser(userUuid)
    }
}

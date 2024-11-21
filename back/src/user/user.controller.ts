import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { UserService } from './user.service';

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
}

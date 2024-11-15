import { Body, Controller, HttpCode, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Put('createUser')
    @HttpCode(201)
    async createUser(@Body() newUser: CreateUserDto){
        return await this.userService.createUser(newUser)
    }
}

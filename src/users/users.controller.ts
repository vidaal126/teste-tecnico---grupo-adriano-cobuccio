import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FindUser } from './dto/find-user.dto';

@Controller()
export class UsersController {
    constructor(private readonly userService:UsersService){}
    
    @Post()
    async createUser(@Body(new ValidationPipe) userDto:CreateUserDto){

        return await this.userService.cadastro(userDto)
    }
    @Get('finduser')
    async findUser(@Body(new ValidationPipe) findUser:FindUser){

        return await this.userService.findUser(findUser)

    }
}

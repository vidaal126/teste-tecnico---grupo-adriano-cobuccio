import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FindUser } from './dto/find-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({
    description: 'Criação de usuário',
  })
  async createUser(@Body(new ValidationPipe()) userDto: CreateUserDto) {
    return await this.userService.cadastro(userDto);
  }
  @Get('finduser')
  async findUser(@Body(new ValidationPipe()) findUser: FindUser) {
    return await this.userService.findUser(findUser);
  }
}

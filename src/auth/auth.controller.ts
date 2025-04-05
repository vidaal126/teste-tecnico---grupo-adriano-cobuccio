import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  sign(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, // dispara erro se mandarem algo a mais
      }),
    )
    authDto: UserAuthDto,
  ) {
    return this.authService.signIn(authDto);
  }
}

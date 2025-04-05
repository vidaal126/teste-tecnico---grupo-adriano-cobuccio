import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
  @ApiProperty({
    description: 'Auth de user',
    example: 'arthur@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Auth de user',
    example: '123@mudar',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

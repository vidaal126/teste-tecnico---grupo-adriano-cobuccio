import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindHistDto {
  @ApiProperty({
    description: 'Busca todos os usuários',
    example: 'todos os IDS',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

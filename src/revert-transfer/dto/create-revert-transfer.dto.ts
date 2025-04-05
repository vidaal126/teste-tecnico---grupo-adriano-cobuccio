import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRevertTransferDto {
  @ApiProperty({
    description: 'Reversão de transferencia',
    example: 'id: 1',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

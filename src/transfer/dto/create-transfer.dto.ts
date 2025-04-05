import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransferDto {
  @ApiProperty({
    description: 'Email do remetente',
    example: 'remetente@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  senderEmail: string;

  @ApiProperty({
    description: 'Email do destinatario',
    example: 'destinatario@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  recipientEmail: string;

  @ApiProperty({
    description: 'Valor da transação',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

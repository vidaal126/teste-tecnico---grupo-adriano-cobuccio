import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransferDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  senderEmail: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  recipientEmail: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

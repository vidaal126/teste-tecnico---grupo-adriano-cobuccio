import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransferDto {

  @IsString()
  @IsNotEmpty()
  senderEmail: string;

  @IsString()
  @IsNotEmpty()
  recipientEmail: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

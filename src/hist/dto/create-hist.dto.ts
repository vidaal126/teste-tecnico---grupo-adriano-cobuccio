import { Status } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateHistDto {

    @IsNumber()
    @IsNotEmpty()
    sender_id: number

    @IsNumber()
    @IsNotEmpty()
    sender_account: number

    @IsNumber()
    @IsNotEmpty()
    recipient_id: number

    @IsNumber()
    @IsNotEmpty()
    recipient_account: number

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    recipient_email: string
    @IsNumber()

    @IsNotEmpty()
    valor:number

    @IsEnum(Status)
    @IsNotEmpty()
    status_transfer: Status
}

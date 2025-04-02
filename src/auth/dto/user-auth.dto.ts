import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserAuthDto{


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}
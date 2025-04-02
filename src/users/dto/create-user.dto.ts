import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
}

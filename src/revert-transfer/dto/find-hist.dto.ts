import { IsNotEmpty, IsNumber } from "class-validator";

export class FindHistDto {
    
    @IsNotEmpty()
    @IsNumber()
    user_id: number
}
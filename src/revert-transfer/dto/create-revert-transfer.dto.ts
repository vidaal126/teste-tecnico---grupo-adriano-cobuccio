import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRevertTransferDto {

    @IsNotEmpty()
    @IsNumber()
    id: number
}

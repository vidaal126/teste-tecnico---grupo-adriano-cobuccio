import { IsEmail, IsNotEmpty, IsString} from "class-validator";

export class FindUser {

    @IsString()
    @IsEmail()
    email: string

}

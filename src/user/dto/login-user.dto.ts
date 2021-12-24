import { IsString } from "class-validator";

export class LoginUserDto{
    id:number;

    @IsString()
    username: string;
    
    @IsString()
    password: string;
}
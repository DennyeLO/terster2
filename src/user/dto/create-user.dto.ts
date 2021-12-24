import { IsEmail, IsPhoneNumber, IsString, Matches } from "class-validator";
import { Match } from "src/util/match.decorator";

export class CreateUserDto {
    @IsString()
    username: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/,{message : "Password must at least a number,uppercase letter and min 6"})
    password: string;

    @IsString()
    @Match("password",{message: "Password and Confirm Password must same"})
    confirm_password: string
    
    @IsString()
    player_name: string;
    
    @IsPhoneNumber('IN')
    phone: string;
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne({username})
        if(user && await bcrypt.compare(password, user.password)){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user:any) {
        const payload = {username : user.username, id: user.id};
        return { access_token: this.jwtService.sign(payload)}
    }
}
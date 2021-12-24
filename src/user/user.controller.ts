import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CreditService } from 'src/credit/credit.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService, private walletService: WalletService, private creditService: CreditService) { }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const wallet = await this.walletService.create({ user_id: user.id, balance: 10000 })
    const credit = await this.creditService.create({ user_id: user.id })
    return {
      statusCode: 200,
      message: "User successfully sign up",
      error: ""
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne({username: loginUserDto.username});
    const jwt = await this.authService.login(user);
    return {
      statusCode: 200,
      data: jwt,
      error: ""
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new BadRequestException("Username or Name is Available")
      }
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(data: object, relation1?: string, relation2?: string): Promise<User> {
    const userFromDB = await this.userRepository.findOne(data, { relations: [relation1 ? relation1 : "room", relation2 ? relation2 : "wallet"], lock: { mode: "pessimistic_write" }, transaction: true })
    if (!userFromDB) {
      throw new NotFoundException(`User not found`)
    }
    return userFromDB
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

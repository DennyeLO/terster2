import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { Credit } from './entities/credit.entity';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
  ) {}

  async create(createCreditDto: CreateCreditDto): Promise<Credit> {
    const credit = this.creditRepository.create(createCreditDto);
    try {
      return await this.creditRepository.save(credit);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  findAll() {
    return `This action returns all credit`;
  }

  async findOne(id: number) {
    const credit = await this.creditRepository.findOne(id, {
      relations: ['user', 'user.wallet'],
    });
    if (!credit) {
      throw new NotFoundException('Credit not found');
    }
    return credit;
  }

  async in(credit: Credit, updateCreditDto: UpdateCreditDto) {
    credit.balance = +credit.balance + +updateCreditDto.amount;
    return credit;
  }
  async out(credit: Credit, updateCreditDto: UpdateCreditDto) {
    credit.balance = +credit.balance - +updateCreditDto.amount;
    if (credit.balance < 0) {
      throw new BadRequestException('Credit is not enough');
    }
    return credit;
  }

  remove(id: number) {
    return `This action removes a #${id} credit`;
  }
}

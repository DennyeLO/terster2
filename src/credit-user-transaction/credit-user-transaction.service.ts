import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditUserTransactionDto } from './dto/create-credit-user-transaction.dto';
import { UpdateCreditUserTransactionDto } from './dto/update-credit-user-transaction.dto';
import { creditUserTransaction } from './entities/credit-user-transaction.entity';

@Injectable()
export class CreditUserTransactionService {
  constructor(
    @InjectRepository(creditUserTransaction)
    private readonly creditUserTransactionRepository: Repository<creditUserTransaction>,
  ) {}
  async create(createCreditUserTransactionDto: CreateCreditUserTransactionDto) {
    return this.creditUserTransactionRepository.create(
      createCreditUserTransactionDto,
    );
  }

  findAll() {
    return `This action returns all creditUserTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creditUserTransaction`;
  }

  update(
    id: number,
    updateCreditUserTransactionDto: UpdateCreditUserTransactionDto,
  ) {
    return `This action updates a #${id} creditUserTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} creditUserTransaction`;
  }
}

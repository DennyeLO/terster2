import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletUserTransactionDto } from './dto/create-wallet-user-transaction.dto';
import { UpdateWalletUserTransactionDto } from './dto/update-wallet-user-transaction.dto';
import { walletUserTransaction } from './entities/wallet-user-transaction.entity';

@Injectable()
export class WalletUserTransactionService {
  constructor(
    @InjectRepository(walletUserTransaction)
    private walletUserTransactionRepository: Repository<walletUserTransaction>,
  ) {}
  async create(createWalletUserTransactionDto: CreateWalletUserTransactionDto) {
    return this.walletUserTransactionRepository.create(
      createWalletUserTransactionDto,
    );
  }

  findAll() {
    return `This action returns all walletUserTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walletUserTransaction`;
  }

  update(
    id: number,
    updateWalletUserTransactionDto: UpdateWalletUserTransactionDto,
  ) {
    return `This action updates a #${id} walletUserTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} walletUserTransaction`;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}
  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = this.walletRepository.create(createWalletDto);
    try {
      return await this.walletRepository.save(wallet);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  findAll() {
    return `This action returns all wallet`;
  }

  async findOne(id: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  async in(wallet: Wallet, updateWalletDto: UpdateWalletDto) {
    wallet.balance = +wallet.balance + +updateWalletDto.amount;
    return wallet;
  }
  async out(wallet: Wallet, updateWalletDto: UpdateWalletDto) {
    wallet.balance = +wallet.balance - +updateWalletDto.amount;
    if (wallet.balance < 0) {
      throw new BadRequestException('Balance is not enough');
    }
    return wallet;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreditUserTransactionService } from 'src/credit-user-transaction/credit-user-transaction.service';
import { UserService } from 'src/user/user.service';
import { WalletUserTransactionService } from 'src/wallet-user-transaction/wallet-user-transaction.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Connection } from 'typeorm';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Controller('credit')
export class CreditController {
  constructor(
    private readonly connection: Connection,
    private readonly creditService: CreditService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly creditUserTransactionService: CreditUserTransactionService,
    private walletUserTransactionService: WalletUserTransactionService,
  ) {}

  create(@Body() createCreditDto: CreateCreditDto) {
    return this.creditService.create(createCreditDto);
  }

  @Get()
  findAll() {
    return this.creditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/in')
  async income(@Body() updateCreditDto: UpdateCreditDto) {
    const player = await this.userService.findOne(
      { id: updateCreditDto.user_id },
      'wallet',
      'credit',
    );
    const { wallet, credit } = player;
    const createWalletUserTransactionDto = {
      wallet_id: wallet.id,
      opening_balance: wallet.balance,
      amount: updateCreditDto.amount,
      closing_balance: +wallet.balance - updateCreditDto.amount,
      type: 'withdraw.game',
      detailable_type: 'CREDIT',
    };
    const createCreditUserTransactionDto = {
      credit_id: credit.id,
      opening_balance: credit.balance,
      amount: updateCreditDto.amount,
      closing_balance: +credit.balance + updateCreditDto.amount,
      type: 'deposit.game',
    };
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createCreditUserTransaction =
        await this.creditUserTransactionService.create(
          createCreditUserTransactionDto,
        );
      const createWalletUserTransaction =
        await this.walletUserTransactionService.create(
          createWalletUserTransactionDto,
        );
      const updatedCredit = await this.creditService.in(
        player.credit,
        updateCreditDto,
      );
      const updatedWallet = await this.walletService.out(
        player.wallet,
        updateCreditDto,
      );
      await queryRunner.manager.save(createCreditUserTransaction);
      await queryRunner.manager.save(createWalletUserTransaction);
      await queryRunner.manager.save(updatedCredit);
      await queryRunner.manager.save(updatedWallet);
      await queryRunner.commitTransaction();
      return player;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err);
    } finally {
      await queryRunner.release();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/out')
  async outcome(@Body() updateCreditDto: UpdateCreditDto) {
    const player = await this.userService.findOne(
      { id: updateCreditDto.user_id },
      'wallet',
      'credit',
    );
    const { wallet, credit } = player;
    const createWalletUserTransactionDto = {
      wallet_id: player.wallet.id,
      opening_balance: wallet.balance,
      amount: updateCreditDto.amount,
      closing_balance: +wallet.balance + updateCreditDto.amount,
      type: 'deposit.game',
      detailable_type: 'CREDIT',
    };
    const createCreditUserTransactionDto = {
      credit_id: player.credit.id,
      opening_balance: credit.balance,
      amount: updateCreditDto.amount,
      closing_balance: +credit.balance - updateCreditDto.amount,
      type: 'withdraw.game',
    };
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newCreditTransaction =
        await this.creditUserTransactionService.create(
          createCreditUserTransactionDto,
        );
      const newWalletTransaction =
        await this.walletUserTransactionService.create(
          createWalletUserTransactionDto,
        );
      const updatedCredit = await this.creditService.out(
        player.credit,
        updateCreditDto,
      );
      const updatedWallet = await this.walletService.in(
        player.wallet,
        updateCreditDto,
      );
      await queryRunner.manager.save(newCreditTransaction);
      await queryRunner.manager.save(newWalletTransaction);
      await queryRunner.manager.save(updatedCredit);
      await queryRunner.manager.save(updatedWallet);
      await queryRunner.commitTransaction();
    } catch (err) {
      throw new BadRequestException(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return player;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditService.remove(+id);
  }
}

import { Module } from '@nestjs/common';
import { WalletUserTransactionService } from './wallet-user-transaction.service';
import { WalletUserTransactionController } from './wallet-user-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { walletUserTransaction } from './entities/wallet-user-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([walletUserTransaction])],
  controllers: [WalletUserTransactionController],
  providers: [WalletUserTransactionService],
  exports: [WalletUserTransactionService]
})
export class WalletUserTransactionModule {}

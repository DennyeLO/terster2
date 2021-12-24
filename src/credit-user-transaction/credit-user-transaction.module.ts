import { Module } from '@nestjs/common';
import { CreditUserTransactionService } from './credit-user-transaction.service';
import { CreditUserTransactionController } from './credit-user-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { creditUserTransaction } from './entities/credit-user-transaction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([creditUserTransaction])],
  controllers: [CreditUserTransactionController],
  providers: [CreditUserTransactionService],
  exports: [CreditUserTransactionService]
})
export class CreditUserTransactionModule {}

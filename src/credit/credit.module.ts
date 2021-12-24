import { forwardRef, Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from './entities/credit.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { CreditUserTransactionModule } from 'src/credit-user-transaction/credit-user-transaction.module';
import { WalletUserTransactionModule } from 'src/wallet-user-transaction/wallet-user-transaction.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Credit]), WalletModule, WalletUserTransactionModule, CreditUserTransactionModule, forwardRef(() => UserModule)],
  controllers: [CreditController],
  providers: [CreditService],
  exports: [CreditService]
})
export class CreditModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { ResultModule } from './result/result.module';
import { BetModule } from './bet/bet.module';
import config from 'ormconfig';
import { Room } from './room/entities/room.entity';
import { WalletModule } from './wallet/wallet.module';
import { WalletUserTransactionModule } from './wallet-user-transaction/wallet-user-transaction.module';
import { CreditModule } from './credit/credit.module';
import { CreditUserTransactionModule } from './credit-user-transaction/credit-user-transaction.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),TypeOrmModule.forFeature([Room]),UserModule, AuthModule, RoomModule, ResultModule, BetModule, WalletModule, WalletUserTransactionModule, CreditModule, CreditUserTransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

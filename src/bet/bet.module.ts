import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { RoomModule } from 'src/room/room.module';
import { ResultModule } from 'src/result/result.module';
import { CreditModule } from 'src/credit/credit.module';
import { CreditUserTransactionModule } from 'src/credit-user-transaction/credit-user-transaction.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bet]), RoomModule, ResultModule, CreditModule, CreditUserTransactionModule, UserModule],
  controllers: [BetController],
  providers: [BetService],
})
export class BetModule { }

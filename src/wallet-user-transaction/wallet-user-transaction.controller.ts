import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletUserTransactionService } from './wallet-user-transaction.service';
import { CreateWalletUserTransactionDto } from './dto/create-wallet-user-transaction.dto';
import { UpdateWalletUserTransactionDto } from './dto/update-wallet-user-transaction.dto';

@Controller('wallet-user-transaction')
export class WalletUserTransactionController {
  constructor(private readonly walletUserTransactionService: WalletUserTransactionService) {}

  @Post()
  create(@Body() createWalletUserTransactionDto: CreateWalletUserTransactionDto) {
    return this.walletUserTransactionService.create(createWalletUserTransactionDto);
  }

  @Get()
  findAll() {
    return this.walletUserTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletUserTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletUserTransactionDto: UpdateWalletUserTransactionDto) {
    return this.walletUserTransactionService.update(+id, updateWalletUserTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletUserTransactionService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreditUserTransactionService } from './credit-user-transaction.service';
import { CreateCreditUserTransactionDto } from './dto/create-credit-user-transaction.dto';
import { UpdateCreditUserTransactionDto } from './dto/update-credit-user-transaction.dto';

@Controller('credit-user-transaction')
export class CreditUserTransactionController {
  constructor(private readonly creditUserTransactionService: CreditUserTransactionService) {}

  @Post()
  create(@Body() createCreditUserTransactionDto: CreateCreditUserTransactionDto) {
    return this.creditUserTransactionService.create(createCreditUserTransactionDto);
  }

  @Get()
  findAll() {
    return this.creditUserTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditUserTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreditUserTransactionDto: UpdateCreditUserTransactionDto) {
    return this.creditUserTransactionService.update(+id, updateCreditUserTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditUserTransactionService.remove(+id);
  }
}

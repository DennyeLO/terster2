import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditUserTransactionDto } from './create-credit-user-transaction.dto';

export class UpdateCreditUserTransactionDto extends PartialType(CreateCreditUserTransactionDto) {}

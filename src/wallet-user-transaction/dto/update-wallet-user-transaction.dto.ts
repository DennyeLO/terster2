import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletUserTransactionDto } from './create-wallet-user-transaction.dto';

export class UpdateWalletUserTransactionDto extends PartialType(CreateWalletUserTransactionDto) {}

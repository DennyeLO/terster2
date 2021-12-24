import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateCreditDto } from './create-credit.dto';

export class UpdateCreditDto extends PartialType(CreateCreditDto) {
    @IsOptional()
    user_id?: number;

    amount: number;
}

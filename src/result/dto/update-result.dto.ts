import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateResultDto } from './create-result.dto';

export class UpdateResultDto extends PartialType(CreateResultDto) {
    @IsOptional()
    touch?: number;
    
    @IsOptional()
    status_game?: boolean;
}

import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsOptional()
    user_id? : number;
    
    @IsOptional()
    bonus1? : number;
    
    @IsOptional()
    bonus2? : number;
    
    @IsOptional()
    bonus3? : number;
    
    @IsOptional()
    bonus4? : number;
}

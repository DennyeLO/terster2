import { Module, forwardRef } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { RoomModule } from 'src/room/room.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result]),UserModule,forwardRef(() => RoomModule)],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService]
})
export class ResultModule {}

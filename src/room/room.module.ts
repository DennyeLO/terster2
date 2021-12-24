import { Module,forwardRef } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { UserModule } from 'src/user/user.module';
import { ResultModule } from 'src/result/result.module';

@Module({
  imports:[TypeOrmModule.forFeature([Room]),UserModule,forwardRef(() =>ResultModule)],
  controllers: [RoomController],
  providers: [RoomService],
  exports:[RoomService]
})

export class RoomModule {}

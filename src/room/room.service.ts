import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm'
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) { }
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll(room: number, roomBet: number) {
    if (roomBet) {
      return this.roomRepository.find({ relations: ["user", "card_results"], where: (x: SelectQueryBuilder<Room>) => { x.where('bet*multiple = :roomBet', { roomBet }) }, skip: 10 * room, take: 10 });
    }
    return this.roomRepository.find({ relations: ["user", "card_results"], skip: 10 * room, take: 10 });
  }

  async findOne(id: number): Promise<Room> {
    const roomFromDB = await this.roomRepository.findOne(id, { relations: ['user'] });
    if (!roomFromDB) {
      throw new NotFoundException(`Room ${id} not found`)
    }
    return roomFromDB;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.findOne(id);
    await this.roomRepository.update(id, updateRoomDto)
    return await this.findOne(id)
  }

  async updateRank(room: Room, rank: string) {
    room[rank] = room[rank] - 1
    return room
  }

  async updateBonus(id: number, room: Room, bonus?: string) {
    if (bonus) {
      room[bonus] = room.bet * room.multiple
    } else {
      for (let i = 1; i <= 4; i++) {
        parseFloat(room["bonus" + i]) && (room["bonus" + i] = parseFloat(room["bonus" + i]) + (+room.bet * +room.multiple) / 100)
      }
    }
    return room;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}

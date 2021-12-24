import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { UserService } from 'src/user/user.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultService } from 'src/result/result.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService, private userService: UserService, private resultService:ResultService) { }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Post('/get/:room')
  // @UseGuards(JwtAuthGuard)
  async findAll(@Param('room') room: string, @Body('bet') bet:number) {
    const roomFromDB = await this.roomService.findAll(+room,+bet);
   for (let i = 0; i < roomFromDB.length; i++) {
     const resultFromDB = await this.resultService.result(roomFromDB[i].id)
     roomFromDB[i].card_results = resultFromDB
   }
   return roomFromDB
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async joinOrLeft(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    if (updateRoomDto.user_id > 0) {
      const { id: userId, room } = await this.userService.findOne({ id: updateRoomDto.user_id }, "room");
      const { user } = await this.roomService.findOne(+id);
      if (room) {
        if (room.id != +id) {
          throw new BadRequestException("Please leave before joining the other room")
        }
      } else if (user) {
        if (user.id != updateRoomDto.user_id) {
          throw new BadRequestException("Room is full")
        }
      }
    }
    return await this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}

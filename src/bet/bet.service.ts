import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetService {
  constructor(@InjectRepository(Bet) private readonly betRepository: Repository<Bet>) {}
  async create(createBetDto: CreateBetDto): Promise<Bet> {
    return this.betRepository.create(createBetDto); 
  }

  async findAll() {
    return await this.betRepository.find({relations:["user","room","card_result"]});
  }

  findOne(id: number) {
    return `This action returns a #${id} bet`;
  }

  update(id: number, updateBetDto: UpdateBetDto) {
    return `This action updates a #${id} bet`;
  }

  remove(id: number) {
    return `This action removes a #${id} bet`;
  }
}

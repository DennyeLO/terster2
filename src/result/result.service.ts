import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultService {
  constructor(@InjectRepository(Result) private readonly resultRepository: Repository<Result>) { }
  async create(createResultDto: CreateResultDto): Promise<Result> {
    const card_result = this.resultRepository.create(createResultDto)
    try {
      return await this.resultRepository.save(card_result)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<Result[]> {
    return await this.resultRepository.find({ relations: ["bets"] });
  }

  async findOne(id: number): Promise<Result> {
    const cardResult = await this.resultRepository.findOne(id, { relations: ["bets", "room", "user", "user.credit"] })
    if (!cardResult) {
      throw new NotFoundException(`Result not found`)
    }
    return cardResult
  }

  async gameStatus(user_id: number): Promise<Result> {
    return await this.resultRepository.findOne({ where: { user_id: user_id, status_game: false }, relations: ["bets"] })
  }

  async result(id: number): Promise<Result[]> {
    return await this.resultRepository.find({ where: [{ room_id: id, rank: "royal_flush" }, { room_id: id, rank: "straight_flush" }, { room_id: id, rank: "five_kind" }, { room_id: id, rank: "four_kind" }], order: { created_at: 'DESC' }, relations: ["bets", "user"] })
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    const result = await this.findOne(id)
    Object.assign(result, updateResultDto);
    return await this.resultRepository.save(result);
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}

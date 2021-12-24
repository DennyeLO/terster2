import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let res = await this.resultService.gameStatus(+id);
    if (!res) {
      return null
    }
    let { card, touch, ...result } = res
    if (touch == 1) {
      card = JSON.stringify([JSON.parse(card)[0], "", JSON.parse(card)[2], "", JSON.parse(card)[4]])
    } else if (touch == 2) {
      card = JSON.stringify([JSON.parse(card)[0], "", JSON.parse(card)[2], "", JSON.parse(card)[4], JSON.parse(card)[5]])
    } else if (touch == 0) {
      card = JSON.stringify([JSON.parse(card)[0], "", JSON.parse(card)[2]])
    }
    return { card, touch, ...result }
  }

  @Get('/room/:id')
  async result(@Param('id') id: string) {
    return this.resultService.result(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}

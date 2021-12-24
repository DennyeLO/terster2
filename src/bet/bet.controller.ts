import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreditUserTransactionService } from 'src/credit-user-transaction/credit-user-transaction.service';
import { CreditService } from 'src/credit/credit.service';
import { ResultService } from 'src/result/result.service';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { Connection } from 'typeorm';
import { LogicGame } from "../util/logic.game"
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';

@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService, private connection: Connection, private readonly resultService: ResultService, private readonly roomService: RoomService, private readonly creditService: CreditService, private readonly creditUserTransactionService: CreditUserTransactionService, private readonly userService: UserService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async bet(@Body() createBetDto: CreateBetDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const cardFromDB = await this.resultService.gameStatus(createBetDto.user_id)
    const player = await this.userService.findOne({ id: createBetDto.user_id }, "room", "credit")
    const { room, credit } = player
    let result_id: number
    if (!cardFromDB) {
      const game = await LogicGame();
      const { amount, ...bet } = createBetDto
      const { display: card, step, rankDescription: rank } = game
      const createResultDto = { ...bet, card, step, rank }
      try {
        const { id: result_id, status_player, rank: rankFromDB } = await this.resultService.create(createResultDto)
        createBetDto.result_id = result_id
        const newBet = await this.betService.create(createBetDto);
        await queryRunner.manager.save(newBet)
        if (status_player) {
          const updatedRank = await this.roomService.updateRank(room, rankFromDB)
          await queryRunner.manager.save(updatedRank)
        }
        if (room.bonus1 !== null || room.bonus2 !== null || room.bonus3 !== null || room.bonus4 !== null) {
          const updatedBonus = await this.roomService.updateBonus(createBetDto.room_id, room)
          await queryRunner.manager.save(updatedBonus)
        }
        const resultFromDB = await this.resultService.findOne(result_id)
        resultFromDB.card = JSON.stringify([JSON.parse(resultFromDB.card)[0], "", JSON.parse(resultFromDB.card)[2]])
        const createCreditUserTransactionDto = { credit_id: credit.id, opening_balance: credit.balance, amount, closing_balance: credit.balance - amount, type: 'withdraw.bet' }
        const newCreditUserTransaction = await this.creditUserTransactionService.create(createCreditUserTransactionDto)
        const updatedCredit = await this.creditService.out(credit, { amount })
        await queryRunner.manager.save(newCreditUserTransaction)
        await queryRunner.manager.save(updatedCredit)
        await queryRunner.commitTransaction()
        let betFromDB = await this.resultService.findOne(resultFromDB.id)
        betFromDB.card = JSON.stringify([JSON.parse(betFromDB.card)[0],"",JSON.parse(betFromDB.card)[2]])
        return betFromDB
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException(err)
      } finally {
        await queryRunner.release();
      }
    } else {
      const updateResultDto = { touch: cardFromDB.touch + 1 }
      if(createBetDto.amount > +cardFromDB.bets[cardFromDB.touch].amount){
        throw new BadRequestException(`Max Bet ${cardFromDB.bets[cardFromDB.touch].amount}`)
      }
      try {
        if (updateResultDto.touch === 3) {
          updateResultDto["status_game"] = true
          if (cardFromDB.status_player && (cardFromDB.rank === 'royal_flush' || cardFromDB.rank === 'five_kind' || cardFromDB.rank === 'straight_flush' || cardFromDB.rank === 'four_kind')) {
            let bonus: string
            cardFromDB.rank === 'royal_flush' ? bonus = "bonus1" : cardFromDB.rank === 'five_kind' ? bonus = "bonus2" : cardFromDB.rank === 'straight_flush' ? bonus = "bonus3" : cardFromDB.rank === 'four_kind' ? bonus = "bonus4" : false
            const updatedBonus = await this.roomService.updateBonus(createBetDto.room_id, room, bonus)
            await queryRunner.manager.save(updatedBonus)
          }
        }
        if (room.bonus1 !== null || room.bonus2 !== null || room.bonus3 !== null || room.bonus4 !== null) {
          const updatedBonus = await this.roomService.updateBonus(createBetDto.room_id, room)
          await queryRunner.manager.save(updatedBonus)
        }
        createBetDto.result_id = cardFromDB.id
        const createBet = await this.betService.create(createBetDto)
        const resultFromDB = await this.resultService.update(cardFromDB.id, updateResultDto);
        if (resultFromDB.touch == 1) {
          resultFromDB.card = JSON.stringify([JSON.parse(resultFromDB.card)[0], "", JSON.parse(resultFromDB.card)[2], "", JSON.parse(resultFromDB.card)[4]])
        } else if (resultFromDB.touch == 2) {
          resultFromDB.card = JSON.stringify([JSON.parse(resultFromDB.card)[0], "", JSON.parse(resultFromDB.card)[2], "", JSON.parse(resultFromDB.card)[4], JSON.parse(resultFromDB.card)[5]])
        }
        const createCreditUserTransactionDto = { credit_id: credit.id, opening_balance: credit.balance, amount: createBetDto.amount, closing_balance: credit.balance - createBetDto.amount, type: 'withdraw.bet' }
        const createCreditUserTransaction = await this.creditUserTransactionService.create(createCreditUserTransactionDto)
        const updatedCredit = await this.creditService.out(credit, { amount: createBetDto.amount })
        await queryRunner.manager.save(createBet)
        await queryRunner.manager.save(createCreditUserTransaction)
        await queryRunner.manager.save(updatedCredit)
        await queryRunner.commitTransaction()
        const newResult = await this.resultService.findOne(resultFromDB.id)
        result_id = newResult.id
        if(newResult.touch == 1){
          newResult.card = JSON.stringify([JSON.parse(newResult.card)[0],"",JSON.parse(newResult.card)[2],"",JSON.parse(newResult.card)[4]])
        } else if(newResult.touch == 2){
          newResult.card = JSON.stringify([JSON.parse(newResult.card)[0],"",JSON.parse(newResult.card)[2],"",JSON.parse(newResult.card)[4],JSON.parse(newResult.card)[5]])
        }
        return newResult
      } catch (err) {
        await queryRunner.rollbackTransaction()
        throw new BadRequestException(err)
      } finally {
        await queryRunner.release()
        const resultFromDB = await this.resultService.findOne(result_id)
        if (resultFromDB["status_player"] === true && resultFromDB.touch === 3) {
          const queryRunner = this.connection.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();
          let totalBet: number = 0
          for (let i = 0; i < 4; i++) {
            totalBet = totalBet + +resultFromDB.bets[i].amount
          }
          const total = (totalBet * resultFromDB.room[resultFromDB.rank + "_rule"]) + totalBet
          try {
            const createCreditUserTransactionDto = { credit_id: credit.id, opening_balance: credit.balance, amount: total, closing_balance: credit.balance + total, type: 'deposit.bet' }
            const createCreditUserTransaction = await this.creditUserTransactionService.create(createCreditUserTransactionDto)
            const updatedCredit = await this.creditService.in(credit, { amount: total })
            await queryRunner.manager.save(createCreditUserTransaction)
            await queryRunner.manager.save(updatedCredit)
            await queryRunner.commitTransaction()
            return await this.resultService.findOne(resultFromDB.id)
          } catch (err) {
            await queryRunner.rollbackTransaction()
            throw new BadRequestException(err)
          } finally {
            await queryRunner.release()
          }
        }
      }
    }
  }

  @Post('/deal')
  @UseGuards(JwtAuthGuard)
  async deal(@Body() createBetDto: CreateBetDto) {
    let result_id: number
    const { credit } = await this.userService.findOne({ id: createBetDto.user_id }, "room", "credit")
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const cardFromDB = await this.resultService.gameStatus(createBetDto.user_id)
      if (cardFromDB.status_player && (cardFromDB.rank === 'royal_flush' || cardFromDB.rank === 'five_kind' || cardFromDB.rank === 'straight_flush' || cardFromDB.rank === 'four_kind')) {
        let bonus: string
        cardFromDB.rank === 'royal_flush' ? bonus = "bonus1" : cardFromDB.rank === 'five_kind' ? bonus = "bonus2" : cardFromDB.rank === 'straight_flush' ? bonus = "bonus3" : cardFromDB.rank === 'four_kind' ? bonus = "bonus4" : false
        const updatedBonus = await this.roomService.updateBonus(createBetDto.room_id, cardFromDB.room, bonus)
        await queryRunner.manager.save(updatedBonus)

      }
      const updateResultDto = { status_game: true }
      const updatedResult = await this.resultService.update(cardFromDB.id, updateResultDto);
      await queryRunner.manager.save(updatedResult)
      await queryRunner.commitTransaction()
      const updateResult = await this.resultService.findOne(updatedResult.id)
      result_id = updateResult.id
      return updateResult
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException(err)
    } finally {
      await queryRunner.release()
      const resultFromDB = await this.resultService.findOne(result_id)
      if (resultFromDB["status_player"] === true) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let totalBet: number = 0
        for (let i = 0; i < resultFromDB.bets.length; i++) {
          totalBet = totalBet + +resultFromDB.bets[i].amount
        }
        const total = (totalBet * resultFromDB.room[resultFromDB.rank + "_rule"]) + totalBet
        try {
          const createCreditUserTransactionDto = { credit_id: credit.id, opening_balance: credit.balance, amount: total, closing_balance: +credit.balance + +total, type: 'deposit.bet' }
          const createCreditUserTransaction = await this.creditUserTransactionService.create(createCreditUserTransactionDto)
          const updatedCredit = await this.creditService.in(credit, { amount: total });
          await queryRunner.manager.save(createCreditUserTransaction)
          await queryRunner.manager.save(updatedCredit)
          await queryRunner.commitTransaction()
          return await this.resultService.findOne(resultFromDB.id)
        } catch (err) {
          await queryRunner.rollbackTransaction()
          throw new BadRequestException(err)
        } finally {
          await queryRunner.release()
        }
      }
    }
  }

  @Get()
  findAll() {
    return this.betService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBetDto: UpdateBetDto) {
    return this.betService.update(+id, updateBetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betService.remove(+id);
  }
}
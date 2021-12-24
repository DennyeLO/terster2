import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';
import { Bet } from 'src/bet/entities/bet.entity';
import { IsOptional } from 'class-validator';

@Entity({name:"card_result"})
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;
  
  @Column()
  room_id: number;

  @Column()
  step: boolean;

  @Column()
  @IsOptional()
  touch?: number;

  @Column()
  card: string;

  @Column()
  rank: string;

  @Column()
  status_game: boolean;
  
  @Column()
  status_player: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.card_results)
  @JoinColumn({name:"user_id"})
  user: User;
  
  @ManyToOne(() => Room, (room) => room.card_results)
  @JoinColumn({name:"room_id"})
  room: Room;

  @OneToMany(() => Bet, (bet) => bet.card_result)
  bets: Bet[];

  @BeforeInsert()
  async checkStatusPlayer() {
    if(this.rank !== 'high_card'){
      this.status_player = true
    }
  }
}

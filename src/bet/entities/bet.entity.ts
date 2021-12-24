import { Result } from 'src/result/entities/result.entity';
import { User } from 'src/user/entities/user.entity';
import { Room } from 'src/room/entities/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  room_id: number;

  @Column()
  result_id: number;

  @Column({ unsigned: true })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.bets)
  @JoinColumn({name: "user_id"})
  user: User;
  
  @ManyToOne(() => Room, (room) => room.bets)
  @JoinColumn({name: "room_id"})
  room: Room;
  
  @ManyToOne(() => Result, (result) => result.bets)
  @JoinColumn({name: "result_id"})
  card_result: Result;
}

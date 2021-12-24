import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Room } from 'src/room/entities/room.entity';
import { Result } from '../../result/entities/result.entity';
import { Bet } from 'src/bet/entities/bet.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Credit } from 'src/credit/entities/credit.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  player_name: string;

  @Column()
  phone: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Room, (room) => room.user)
  room: Room;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToOne(() => Credit, (credit) => credit.user)
  credit: Credit;

  @OneToMany(() => Result, (result) => result.user)
  card_results: Result[];

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
}

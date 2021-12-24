import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bet } from 'src/bet/entities/bet.entity';
import { User } from 'src/user/entities/user.entity';
import { Result } from '../../result/entities/result.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:true })
  user_id: number;

  @Column('decimal',{precision: 14,scale: 2, nullable:true })
  bonus1: number;

  @Column('decimal',{precision: 14,scale: 2, nullable:true })
  bonus2: number;

  @Column('decimal',{precision: 14,scale: 2, nullable:true })
  bonus3: number;

  @Column('decimal',{precision: 14,scale: 2, nullable:true })
  bonus4: number;

  @Column()
  maks_bonus1: number;

  @Column()
  maks_bonus2: number;

  @Column()
  maks_bonus3: number;

  @Column()
  maks_bonus4: number;

  @Column()
  royal_flush: number;

  @Column()
  straight_flush: number;

  @Column()
  five_kind: number;

  @Column()
  four_kind: number;
  
  @Column()
  full_house: number;

  @Column()
  flush: number;

  @Column()
  straight: number;

  @Column()
  three_kind: number;

  @Column()
  two_pair: number;

  @Column()
  ace_pair: number;

  @Column()
  royal_flush_rule: number;

  @Column()
  five_kind_rule: number;

  @Column()
  straight_flush_rule: number;
  
  @Column()
  four_kind_rule: number;
  
  @Column()
  full_house_rule: number;
  
  @Column()
  flush_rule: number;
  
  @Column()
  straight_rule: number;
  
  @Column()
  three_kind_rule: number;
  
  @Column()
  two_pair_rule: number;
  
  @Column()
  ace_pair_rule: number;

  @Column()
  bet: number;

  @Column()
  multiple: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.room)
  @JoinColumn({name:'user_id'})
  user: User;

  @OneToMany(() => Bet, (bet) => bet.room)
  bets: Bet[];

  @OneToMany(() => Result, (result) => result.room)
  card_results: Result[];
}

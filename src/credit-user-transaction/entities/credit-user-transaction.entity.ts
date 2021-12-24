import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Credit } from 'src/credit/entities/credit.entity';
  
@Entity()
export class creditUserTransaction {
@PrimaryGeneratedColumn()
id: number;

@Column()
credit_id: number;

@Column()
opening_balance: number;

@Column()
amount: number;

@Column()
closing_balance: number;

@Column()
type: string;

@CreateDateColumn()
created_at: Date;
  
@UpdateDateColumn()
updated_at: Date;

@ManyToOne(() => Credit, (credit) => credit.creditUserTransactions)
@JoinColumn({name:'credit_id'})
credit: Credit;
}
  
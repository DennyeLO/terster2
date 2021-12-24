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
import { creditUserTransaction } from 'src/credit-user-transaction/entities/credit-user-transaction.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ unsigned: true })
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.credit)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => creditUserTransaction, (creditUserTransaction) => creditUserTransaction.credit)
  creditUserTransactions: creditUserTransaction[];
}

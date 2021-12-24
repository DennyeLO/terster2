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
import { User } from 'src/user/entities/user.entity';
import { walletUserTransaction } from 'src/wallet-user-transaction/entities/wallet-user-transaction.entity';
import { Credit } from 'src/credit/entities/credit.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.room)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => walletUserTransaction, (walletUserTransaction) => walletUserTransaction.wallet)
  walletUserTransactions: walletUserTransaction[];
}

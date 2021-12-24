import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';
  
  @Entity()
  export class walletUserTransaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    wallet_id: number;
    
    @Column()
    opening_balance: number;
    
    @Column()
    amount: number;
    
    @Column()
    closing_balance: number;
    
    @Column()
    type: string;
    
    @Column()
    detailable_type: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => Wallet, (wallet) => wallet.walletUserTransactions)
    @JoinColumn({name:'wallet_id'})
    wallet: Wallet;
}
  
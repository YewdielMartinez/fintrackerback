import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity'; // Ajusta la ruta según tu proyecto
import { Account } from 'src/account/account.entity'; // Ajusta la ruta según tu proyecto
import { TransactionType } from 'src/transactiontype/transactiontype.entity'; // Ajusta la ruta según tu proyecto
import { Category } from 'src/category/category.entity'; // Ajusta la ruta según tu proyecto

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'id_transaction' })
  id: number;

  @ManyToOne(() => User, (user) => user.transactions, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_users' })
  user: User | null;

  @ManyToOne(() => Account, (account) => account.transactions, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_account' })
  account: Account | null;

  @ManyToOne(() => TransactionType, (transactionType) => transactionType.transactions, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_transaction_type' })
  transactionType: TransactionType | null;

  @ManyToOne(() => Category, (category) => category.transactions, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_category' })
  category: Category | null;

  @Column({ type: 'decimal', precision: 65, scale: 30 })
  amount: number;

  @Column({ type: 'varchar', length: 191, nullable: true, default: null })
  description: string | null;

  @Column({ name: 'transaction_date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;

  @CreateDateColumn({ name: 'created_in', type: 'datetime', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  createdIn: Date;
}

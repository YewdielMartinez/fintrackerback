import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { TransactionType } from 'src/transactiontype/transactiontype.entity'; // Asegúrate de importar correctamente la entidad TransactionType
import { Transaction } from 'src/transaction/transaction.entity';

@Entity('category') // Nombre de la tabla
export class Category {
  @PrimaryGeneratedColumn({ name: 'id_category' })
  id: number;

  @Column({
    name: 'name_category',
    type: 'varchar',
    length: 191,
    collation: 'utf8mb4_unicode_ci',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description_category',
    type: 'varchar',
    length: 191,
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
    default: null,
  })
  description: string | null;

  // Relación con la entidad TransactionType
  @ManyToOne(() => TransactionType, { eager: true })
  @JoinColumn({ name: 'id_type_transaction' })
  typeTransaction: TransactionType;
  
  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}

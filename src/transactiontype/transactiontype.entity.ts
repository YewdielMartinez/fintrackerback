import { Transaction } from 'src/transaction/transaction.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany
  } from 'typeorm';
  
  @Entity('transactiontype') // Nombre de la tabla
  @Unique('TransactionType_name_type_key', ['name']) // Índice único en la columna name
  export class TransactionType {
    @PrimaryGeneratedColumn({ name: 'id_transaction_type' })
    id: number;
  
    @Column({ name: 'name_type', type: 'varchar', length: 191 })
    name: string;
  
    @Column({
      name: 'description_type',
      type: 'varchar',
      length: 191,
      nullable: true,
    })
    description: string | null;
    @OneToMany(() => Transaction, (transaction) => transaction.transactionType)
    transactions: Transaction[];
  }
  
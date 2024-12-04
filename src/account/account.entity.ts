import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User } from 'src/user/user.entity';// Asegúrate de ajustar la ruta según tu estructura de proyecto
import { TypeAccount } from 'src/typeAccount/typeaccount.entity';
import { Transaction } from 'src/transaction/transaction.entity';
@Entity('account') // Nombre de la tabla
export class Account {
  @PrimaryGeneratedColumn({ name: 'id_account' })
  id: number;

  @Column({ name: 'name_account', type: 'varchar', length: 191 })
  name: string;

  @Column({
    name: 'initial_balance',
    type: 'decimal',
    precision: 65,
    scale: 30,
    default: '0.000000000000000000000000000000',
  })
  initialBalance: number;
  

  @CreateDateColumn({
    name: 'created_in',
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdIn: Date;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' }) // Nombre de la columna de clave foránea
  user: User;
    // Relación con TypeAccount
    @ManyToOne(() => TypeAccount, { eager: true }) // Eager para cargar automáticamente el tipo de cuenta
    @JoinColumn({ name: 'id_type_account' })
    typeAccount: TypeAccount;
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}

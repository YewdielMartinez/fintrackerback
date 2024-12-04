import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Account } from 'src/account/account.entity';
import { Transaction } from 'src/transaction/transaction.entity';
@Entity('user') // Nombre de la tabla
@Unique('User_email_users_key', ['email']) // Llave única
export class User {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column({ name: 'name_users', type: 'varchar', length: 191 })
  name: string;

  @Column({ name: 'lastname_users', type: 'varchar', length: 191 })
  lastname: string;

  @Column({ name: 'username_user', type: 'varchar', length: 191 })
  username: string;

  @Column({ name: 'email_users', type: 'varchar', length: 191 })
  email: string;

  @Column({ name: 'password_users', type: 'varchar', length: 191 })
  password: string;

  @CreateDateColumn({
    name: 'creation_date',
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  creationDate: Date;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}

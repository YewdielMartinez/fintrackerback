import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { User } from 'src/user/user.entity';
import { TypeAccount } from 'src/typeAccount/typeaccount.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(TypeAccount)
    private typeAccountRepository: Repository<TypeAccount>,
  ) {}

  /**
   * Crear una nueva cuenta
   * @param accountDto Datos para crear una cuenta
   */
  async createAccount(accountDto: CreateAccountDto) {
    const { name, initialBalance, userId, id_type_account } = accountDto;

    // Busca las entidades relacionadas
    const user = await this.userRepository.findOneBy({ id_users: userId });
    const typeAccount = await this.typeAccountRepository.findOneBy({
      id: id_type_account,
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!typeAccount) {
      throw new Error('TypeAccount not found');
    }

    // Crea la nueva cuenta
    const newAccount = this.accountRepository.create({
      name,
      initialBalance,
      user,
      typeAccount,
    });

    // Guarda en la base de datos
    return this.accountRepository.save(newAccount);
  }

  /**
   * Obtener todas las cuentas
   */
  getAccounts() {
    return this.accountRepository.find({ relations: ['user', 'typeAccount'] });
  }

  /**
   * Obtener una cuenta por ID
   * @param id Identificador de la cuenta
   */
  getAccount(id: number) {
    return this.accountRepository.findOne({
      where: { id },
      relations: ['user', 'typeAccount'],
    });
  }

  /**
   * Eliminar una cuenta por ID
   * @param id Identificador de la cuenta
   */
  deleteAccount(id: number) {
    return this.accountRepository.delete({ id });
  }

  /**
   * Actualizar una cuenta por ID
   * @param id Identificador de la cuenta
   * @param account Datos actualizados
   */
  async updateAccount(id: number, account: UpdateAccountDto) {
    const { userId, id_type_account, ...rest } = account;

    const updateData: Partial<Account> = { ...rest };

    if (userId) {
      const user = await this.userRepository.findOneBy({ id_users: userId });
      if (!user) {
        throw new Error('User not found');
      }
      updateData.user = user;
    }

    if (id_type_account) {
      const typeAccount = await this.typeAccountRepository.findOneBy({
        id: id_type_account,
      });
      if (!typeAccount) {
        throw new Error('TypeAccount not found');
      }
      updateData.typeAccount = typeAccount;
    }

    return this.accountRepository.update(id, updateData);
  }
}

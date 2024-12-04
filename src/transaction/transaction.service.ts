import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { User } from 'src/user/user.entity';
import { Account } from 'src/account/account.entity';
import { TransactionType } from 'src/transactiontype/transactiontype.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(TransactionType)
    private transactionTypeRepository: Repository<TransactionType>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Crear una nueva transacción
   * @param transaction Datos de la nueva transacción
   */
  async createTransaction(
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const newTransaction = new Transaction();

// Resolver relaciones y agregar validación específica para cada una
newTransaction.user = await this.userRepository.findOne({
  where: { id_users: transactionDto.id_users },
});
if (!newTransaction.user) {
  throw new Error(`Usuario con ID ${transactionDto.id_users} no encontrado.`);
}

newTransaction.account = await this.accountRepository.findOne({
  where: { id: transactionDto.id_account },
});
if (!newTransaction.account) {
  throw new Error(`Cuenta con ID ${transactionDto.id_account} no encontrada.`);
}

newTransaction.transactionType = await this.transactionTypeRepository.findOne({
  where: { id: transactionDto.id_transaction_type },
});
if (!newTransaction.transactionType) {
  throw new Error(`Tipo de transacción con ID ${transactionDto.id_transaction_type} no encontrado.`);
}

newTransaction.category = await this.categoryRepository.findOne({
  where: { id: transactionDto.id_category },
});
if (!newTransaction.category) {
  throw new Error(`Categoría con ID ${transactionDto.id_category} no encontrada.`);
}

// Asignar datos simples
newTransaction.amount = transactionDto.amount;
newTransaction.description = transactionDto.description;
newTransaction.transactionDate = transactionDto.transaction_date
  ? new Date(transactionDto.transaction_date)
  : new Date();

return this.transactionRepository.save(newTransaction);


    // Validar relaciones
    if (!newTransaction.user || !newTransaction.account || !newTransaction.transactionType || !newTransaction.category) {
      throw new Error('Una o más relaciones no existen.');
    }

    // Asignar datos simples
    newTransaction.amount = transactionDto.amount;
    newTransaction.description = transactionDto.description;
    newTransaction.transactionDate = transactionDto.transaction_date
      ? new Date(transactionDto.transaction_date)
      : new Date();

    return this.transactionRepository.save(newTransaction);
  }

  /**
   * Obtener todas las transacciones
   */
  async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      relations: ['user', 'account', 'transactionType', 'category'],
    });
  }

  /**
   * Obtener una transacción por ID
   * @param id Identificador de la transacción
   */
  async getTransaction(id: number): Promise<Transaction> {
    return this.transactionRepository.findOne({
      where: { id },
      relations: ['user', 'account', 'transactionType', 'category'],
    });
  }

  /**
   * Actualizar una transacción por ID
   * @param id Identificador de la transacción
   * @param transaction Datos actualizados de la transacción
   */
  async updateTransaction(
    id: number,
    transactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new Error(`Transacción con ID ${id} no encontrada.`);
    }

    // Resolver y actualizar relaciones si se envían
    if (transactionDto.id_users) {
      transaction.user = await this.userRepository.findOne({
        where: { id_users: transactionDto.id_users },
      });
    }

    if (transactionDto.id_account) {
      transaction.account = await this.accountRepository.findOne({
        where: { id: transactionDto.id_account },
      });
    }

    if (transactionDto.id_transaction_type) {
      transaction.transactionType = await this.transactionTypeRepository.findOne({
        where: { id: transactionDto.id_transaction_type },
      });
    }

    if (transactionDto.id_category) {
      transaction.category = await this.categoryRepository.findOne({
        where: { id: transactionDto.id_category },
      });
    }

    // Actualizar campos simples
    if (transactionDto.amount !== undefined) {
      transaction.amount = transactionDto.amount;
    }
    if (transactionDto.description !== undefined) {
      transaction.description = transactionDto.description;
    }
    if (transactionDto.transaction_date) {
      transaction.transactionDate = new Date(transactionDto.transaction_date);
    }

    return this.transactionRepository.save(transaction);
  }

  /**
   * Eliminar una transacción por ID
   * @param id Identificador de la transacción
   */
  async deleteTransaction(id: number): Promise<void> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new Error(`Transacción con ID ${id} no encontrada.`);
    }
    await this.transactionRepository.delete(id);
  }
}

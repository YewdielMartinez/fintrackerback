import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionType } from './transactiontype.entity';
import { CreateTransactionTypeDto } from './dto/create-transactiontype.dto';
import { UpdateTransactionTypeDto } from './dto/update-transactiontype.dto';

@Injectable()
export class TransactionTypeService {
  constructor(
    @InjectRepository(TransactionType)
    private transactionTypeRepository: Repository<TransactionType>,
  ) {}

  /**
   * Crear un nuevo tipo de transacción
   * @param transactionType Datos para crear el tipo de transacción
   */
  createTransactionType(transactionType: CreateTransactionTypeDto) {
    const newTransactionType =
      this.transactionTypeRepository.create(transactionType);
    return this.transactionTypeRepository.save(newTransactionType);
  }

  /**
   * Obtener todos los tipos de transacción
   */
  getAllTransactionTypes() {
    return this.transactionTypeRepository.find();
  }

  /**
   * Obtener un tipo de transacción por ID
   * @param id Identificador del tipo de transacción
   */
  getTransactionTypeById(id: number) {
    return this.transactionTypeRepository.findOne({
      where: { id },
    });
  }

  /**
   * Eliminar un tipo de transacción por ID
   * @param id Identificador del tipo de transacción
   */
  deleteTransactionType(id: number) {
    return this.transactionTypeRepository.delete({ id });
  }

  /**
   * Actualizar un tipo de transacción por ID
   * @param id Identificador del tipo de transacción
   * @param transactionType Datos actualizados
   */
  updateTransactionType(id: number, transactionType: UpdateTransactionTypeDto) {
    return this.transactionTypeRepository.update({ id }, transactionType);
  }
}

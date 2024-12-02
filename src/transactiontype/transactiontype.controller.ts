import { Body, Controller, Post, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { TransactionTypeService } from './transactiontype.service';
import { CreateTransactionTypeDto } from './dto/create-transactiontype.dto';
import { UpdateTransactionTypeDto } from './dto/update-transactiontype.dto';
import { TransactionType } from './transactiontype.entity';

@Controller('transactiontype') // Ruta base para el controlador
export class TransactionTypeController {
  constructor(private transactionTypeService: TransactionTypeService) {}

  /**
   * Obtener todos los tipos de transacción
   */
  @Get()
  getAllTransactionTypes(): Promise<TransactionType[]> {
    return this.transactionTypeService.getAllTransactionTypes();
  }

  /**
   * Obtener un tipo de transacción por ID
   * @param id Identificador del tipo de transacción
   */
  @Get(':id')
  getTransactionTypeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransactionType> {
    return this.transactionTypeService.getTransactionTypeById(id);
  }

  /**
   * Crear un nuevo tipo de transacción
   * @param newTransactionType Datos para crear el tipo de transacción
   */
  @Post()
  createTransactionType(@Body() newTransactionType: CreateTransactionTypeDto) {
    return this.transactionTypeService.createTransactionType(newTransactionType);
  }

  /**
   * Eliminar un tipo de transacción por ID
   * @param id Identificador del tipo de transacción
   */
  @Delete(':id')
  deleteTransactionType(@Param('id', ParseIntPipe) id: number) {
    return this.transactionTypeService.deleteTransactionType(id);
  }

  /**
   * Actualizar un tipo de transacción por ID
   * @param id Identificador del tipo de transacción
   * @param updatedTransactionType Datos actualizados
   */
  @Patch(':id')
  updateTransactionType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedTransactionType: UpdateTransactionTypeDto,
  ) {
    return this.transactionTypeService.updateTransactionType(
      id,
      updatedTransactionType,
    );
  }
}

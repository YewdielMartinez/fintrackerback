import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { CreateTransactionDto } from './dto/create-transaction.dto';
  import { UpdateTransactionDto } from './dto/update-transaction.dto';
  import { Transaction } from './transaction.entity';
  
  @Controller('transactions') // Prefijo de la ruta
  export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}
  
    /**
     * Obtener todas las transacciones
     */
    @Get()
    getTransactions(): Promise<Transaction[]> {
      return this.transactionService.getTransactions();
    }
  
    /**
     * Obtener una transacción por ID
     * @param id Identificador de la transacción
     */
    @Get(':id')
    getTransaction(@Param('id', ParseIntPipe) id: number): Promise<Transaction> {
      return this.transactionService.getTransaction(id);
    }
  
    /**
     * Crear una nueva transacción
     * @param createTransactionDto Datos de la transacción
     */
    @Post()
    createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
      return this.transactionService.createTransaction(createTransactionDto);
    }
  
    /**
     * Actualizar una transacción por ID
     * @param id Identificador de la transacción
     * @param updateTransactionDto Datos actualizados
     */
    @Patch(':id')
    updateTransaction(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTransactionDto: UpdateTransactionDto,
    ) {
      return this.transactionService.updateTransaction(id, updateTransactionDto);
    }
  
    /**
     * Eliminar una transacción por ID
     * @param id Identificador de la transacción
     */
    @Delete(':id')
    deleteTransaction(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.transactionService.deleteTransaction(id);
    }
  }
  
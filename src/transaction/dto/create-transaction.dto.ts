import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  id_users: number; // ID del usuario relacionado

  @IsNumber()
  @IsNotEmpty()
  id_account: number; // ID de la cuenta relacionada

  @IsNumber()
  @IsNotEmpty()
  id_transaction_type: number; // ID del tipo de transacción

  @IsNumber()
  @IsNotEmpty()
  id_category: number; // ID de la categoría relacionada

  @IsNumber()
  @IsNotEmpty()
  amount: number; // Monto de la transacción

  @IsOptional()
  @IsString()
  description?: string; // Descripción opcional

  @IsString()
  @IsOptional()
  transaction_date?: string; // Fecha de la transacción en formato ISO
}

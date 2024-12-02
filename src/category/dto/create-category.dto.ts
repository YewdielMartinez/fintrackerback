import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  id_type_transaction: number; // Campo para la relación con el tipo de transacción
}

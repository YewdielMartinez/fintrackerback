import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  initialBalance?: number;

  @IsNumber()
  @IsOptional()
  userId?: number; // Relacionado con el ID del usuario
  @IsNumber()
   id_type_account?: number
}

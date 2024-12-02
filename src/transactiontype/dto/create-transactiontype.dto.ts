import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransactionTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

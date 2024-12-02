import { IsString, IsOptional } from 'class-validator';

export class UpdateTransactionTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

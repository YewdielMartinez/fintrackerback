import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  initialBalance: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number; // Relacionado con el ID del usuario
  @IsNumber()
  @IsNotEmpty()
  id_type_account: number
}

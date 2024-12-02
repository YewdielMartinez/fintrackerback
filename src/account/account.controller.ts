import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Patch,
  } from '@nestjs/common';
  import { AccountService } from 'src/account/account.service'; 
 import { CreateAccountDto } from 'src/account/dto/create-account.dto';
  import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
  import { Account } from 'src/account/account.entity';
  
  @Controller('account') // Ruta base para la entidad Account
  export class AccountController {
    constructor(private readonly accountService: AccountService) {}
  
    /**
     * Obtener todas las cuentas
     */
    @Get()
    getAccounts(): Promise<Account[]> {
      return this.accountService.getAccounts();
    }
  
    /**
     * Obtener una cuenta por su ID
     * @param id ID de la cuenta
     */
    @Get(':id')
    getAccount(@Param('id', ParseIntPipe) id: number): Promise<Account> {
      return this.accountService.getAccount(id);
    }
  
    /**
     * Crear una nueva cuenta
     * @param newAccount Datos de la cuenta a crear
     */
    @Post()
    createAccount(@Body() newAccount: CreateAccountDto): Promise<Account> {
      return this.accountService.createAccount(newAccount);
    }
  
    /**
     * Eliminar una cuenta por su ID
     * @param id ID de la cuenta
     */
    @Delete(':id')
    deleteAccount(@Param('id', ParseIntPipe) id: number){
      return this.accountService.deleteAccount(id);
    }
  
    /**
     * Actualizar una cuenta por su ID
     * @param id ID de la cuenta
     * @param account Datos a actualizar
     */
    @Patch(':id')
    updateAccount(
      @Param('id', ParseIntPipe) id: number,
      @Body() account: UpdateAccountDto,
    ) {
      return this.accountService.updateAccount(id, account);
    }
  }
  
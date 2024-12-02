import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Account } from 'src/account/account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UserModule } from 'src/user/user.module';
import { TypeAccountModule } from 'src/typeAccount/typeaccount.module';

@Module({
  //Hacer el imports de los modulos relacionados
  imports: [TypeOrmModule.forFeature([Account]),
  UserModule,TypeAccountModule],
  controllers: [AccountController],
  providers: [AccountService],//Si la entidad es utilizada en otras entidades hay que exportar
  exports:[TypeOrmModule]
})
export class AccountModule {}

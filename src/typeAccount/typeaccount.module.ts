import { TypeAccount } from './typeaccount.entity';
import { TypeaccountService } from './typeaccount.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Account } from 'src/account/account.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeAccount,Account,User])],
  controllers: [],
  providers: [TypeaccountService],
  exports:[TypeOrmModule]
})
export class TypeAccountModule {}

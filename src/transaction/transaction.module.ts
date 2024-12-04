import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { Account } from 'src/account/account.entity';
import { User } from 'src/user/user.entity';
import { TransactionType } from 'src/transactiontype/transactiontype.entity';
import { Category } from 'src/category/category.entity';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction,Account,User,TransactionType,Category])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TypeOrmModule]
})
export class TransactionModule {}
